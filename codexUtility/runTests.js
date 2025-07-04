#!/usr/bin/env node
/**
 * @file runTests.js
 * @description Builds the project and runs all spec.ts tests via `npm test`.
 */

const { spawn } = require("child_process");

console.log("Building project and running all spec.ts tests...");
const child = spawn("npm test", { stdio: "inherit", shell: true });

child.on("exit", (code) => {
  process.exit(code);
});