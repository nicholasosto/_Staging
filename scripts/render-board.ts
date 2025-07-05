//@ts-nocheck
// scripts/render-board.ts
/// <reference types="@rbxts/types" />

/**
 * @file        render-board.ts
 * @module      RenderBoard
 * @layer       scripts
 * @description Generates TASK_BOARD.md from tasks.yaml.
 */

//
// Usage:
//   ts-node scripts/render-board.ts         # writes TASK_BOARD.md at project root
//
// Dev deps: npm i -D js-yaml
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const TASK_FILE = path.resolve(__dirname, "../tasks/tasks.yaml");
const BOARD_FILE = path.resolve(__dirname, "../TASK_BOARD.md");

const tasks = yaml.load(fs.readFileSync(TASK_FILE, "utf8"));

/**
 * Group tasks by status and return a map: status -> Task[]
 */
function groupByStatus(list) {
  return list.reduce((acc, t) => {
    (acc[t.status] ??= []).push(t);
    return acc;
  }, {});
}

/**
 * Render a single Markdown table section.
 */
function renderSection(title, taskArr) {
  if (taskArr.length === 0) return `### ${title}\n_No tasks._\n\n`;

  const rows = taskArr
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(
      (t) =>
        `| ${t.id} | ${t.title} | ${t.estimatedHours ?? "—"} | ${
          t.blockedBy.join(", ") || "—"
        } | ${t.blocksTask.join(", ") || "—"} |`,
    )
    .join("\n");

  return `### ${title}\n| ID | Title | h | Blocked By | Blocks |\n| --- | --- | :--: | --- | --- |\n${rows}\n\n`;
}

// ---------- Build board ----------
const grouped = groupByStatus(tasks);
const sections = [
  "Not Ready",
  "Ready",
  "Under Construction",
  "Draft",
  "Completed",
]
  .map((status) => renderSection(status, grouped[status] ?? []))
  .join("");    

const header = `<!-- AUTO-GENERATED: DO NOT EDIT -->
# 📋 Project Task Board
*(updated ${new Date().toISOString().slice(0, 10)})*\n\n`;

fs.writeFileSync(BOARD_FILE, header + sections);
console.log(`✨ Wrote ${BOARD_FILE}`);
