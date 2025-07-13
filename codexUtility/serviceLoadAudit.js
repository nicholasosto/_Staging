#!/usr/bin/env node
/**
 * @file        serviceLoadAudit.js
 * @module      ServiceLoadAudit
 * @description Generates service dependency graph and load order reports.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · codexUtility    │
 * ╰───────────────────────────────╯
 *
 * Simple static analysis over server Services to detect dependency edges,
 * initialization order and potential architectural issues.
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.resolve(__dirname, '..');
const serverDir = path.join(repoRoot, 'src/server');
const reportsDir = path.join(repoRoot, 'reports');

if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

function findServiceFiles(dir) {
    const res = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) res.push(...findServiceFiles(full));
        else if (/Service\.ts$/.test(item.name)) res.push(full);
    }
    return res;
}

const serviceFiles = findServiceFiles(serverDir).filter(f => !f.includes('.test.'));

function getServiceName(file) {
    const base = path.basename(file).replace(/\.ts$/, '');
    return base;
}

const services = new Map();
serviceFiles.forEach(f => services.set(getServiceName(f), f));

function parseImports(file) {
    const text = fs.readFileSync(file, 'utf8');
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const deps = new Set();
    source.forEachChild(node => {
        if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            const spec = node.moduleSpecifier.text;
            let resolved = spec;
            if (spec.startsWith('.')) {
                resolved = path.resolve(path.dirname(file), spec);
                if (!resolved.endsWith('.ts')) resolved += '.ts';
            }
            for (const [name, sf] of services.entries()) {
                if (sf === resolved) deps.add(name);
                else if (resolved.endsWith(name + '.ts')) deps.add(name);
            }
        }
    });
    return Array.from(deps);
}

const graph = new Map();
services.forEach((file, name) => {
    graph.set(name, parseImports(file));
});

// Detect cycles via DFS
function detectCycles() {
    const visited = new Set();
    const stack = new Set();
    const cycles = [];
    function visit(n) {
        if (stack.has(n)) return [true];
        if (visited.has(n)) return [false];
        visited.add(n);
        stack.add(n);
        for (const m of graph.get(n) || []) {
            const [c] = visit(m);
            if (c) cycles.push([...stack, m]);
        }
        stack.delete(n);
        return [false];
    }
    for (const n of graph.keys()) visit(n);
    return cycles;
}

const cycles = detectCycles();

function writeDot() {
    const lines = ['digraph ServiceDeps {'];
    graph.forEach((deps, svc) => {
        if (deps.length === 0) lines.push(`  "${svc}";`);
        deps.forEach(dep => lines.push(`  "${svc}" -> "${dep}";`));
    });
    lines.push('}');
    fs.writeFileSync(path.join(reportsDir, 'service-deps.dot'), lines.join('\n'), 'utf8');
    console.log('Service Dependency Edges:');
    graph.forEach((deps, svc) => {
        console.log(`- ${svc} -> ${deps.join(', ') || 'None'}`);
    });
}

function findAutoStarts() {
    const events = [];
    services.forEach((file, name) => {
        const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
        lines.forEach((line, idx) => {
            const m = line.match(/(\w+Service)\.Start\(/);
            if (m) {
                events.push({ svc: m[1], file, line: idx + 1 });
            }
        });
    });
    return events;
}

function parseMain() {
    const file = path.join(serverDir, 'main.server.ts');
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    const events = [];
    lines.forEach((line, idx) => {
        const m = line.match(/(\w+Service)\.Start/);
        if (m) events.push({ svc: m[1], file, line: idx + 1 });
    });
    return events;
}

function writeLoadOrder() {
    const events = [...findAutoStarts(), ...parseMain()];
    events.sort((a, b) => a.line - b.line);
    const lines = events.map(e => `${e.svc} -> ${path.relative(repoRoot, e.file)}:${e.line}`);
    fs.writeFileSync(path.join(reportsDir, 'service-load-order.txt'), lines.join('\n'), 'utf8');
    console.log('Load Order Timeline:');
    lines.forEach(l => console.log('  ' + l));
}

function smellReport() {
    const lines = [];
    graph.forEach((deps, svc) => {
        if (deps.length === 0) lines.push(`INFO: ${svc} has no outgoing deps.`);
        if (deps.length > 5) lines.push(`WARNING: ${svc} fan-out ${deps.length}.`);
    });
    cycles.forEach(c => lines.push(`ERROR: cycle detected ${c.join(' -> ')}`));
    fs.writeFileSync(path.join(reportsDir, 'service-smells.txt'), lines.join('\n'), 'utf8');
    console.log('Conflict & Smell Report:');
    lines.forEach(l => console.log('  ' + l));
    if (lines.some(l => l.startsWith('ERROR'))) process.exitCode = 1;
}

function recommendations() {
    const rec = [];
    rec.push('Consider implementing a ServiceLoader that declares dependencies explicitly.');
    rec.push('Services should register themselves but defer Start until dependencies are ready.');
    rec.push('Example minimal loader:');
    rec.push('```ts');
    rec.push('interface ServiceMeta { svc: any; deps: string[] }');
    rec.push('function load(services: ServiceMeta[]) {');
    rec.push('  const map = new Map();');
    rec.push('  const loadSvc = (meta) => {');
    rec.push('    meta.deps.forEach(d => loadSvc(map.get(d)));');
    rec.push('    meta.svc.Start();');
    rec.push('  };');
    rec.push('  services.forEach(loadSvc);');
    rec.push('}');
    rec.push('```');
    fs.writeFileSync(path.join(reportsDir, 'service-recommendations.txt'), rec.join('\n'), 'utf8');
    console.log('Architecture Recommendations written.');
}

writeDot();
writeLoadOrder();
smellReport();
recommendations();
console.log('✅ Service Load Audit completed – reports available in /reports');

