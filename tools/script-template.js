#!/usr/bin/env node
/**
 * @file script-template.js
 * @module ScriptTemplate
 * @description Generates a small example script to verify the Nx toolchain.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Tools           │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 */

const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'generated-script.js');
const content = `#!/usr/bin/env node\nconsole.log('Generated script executed successfully.');\n`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log(`Generated ${outputPath}`);

