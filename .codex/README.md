# codexUtility

This directory contains automation scripts and utilities for the Soul Steel project.

Scripts here operate on both the TypeScript source code (`src/`) and the generated Lua output (`out/`),
as well as project configuration and packaging files.

## Conventions

- Name scripts in camelCase (e.g., `syncConfig.js`, `generatePackageManifest.js`).
- Include a top-level JSDoc comment block in each script describing its purpose and usage.
- After adding a new script, update the “CodexUtility Section” in `AGENTS.md`.

## Available scripts

| Script      | Description                                               |
|-------------|-----------------------------------------------------------|
| runTests.js | Builds the project and runs all spec.ts tests via `npm test`. |