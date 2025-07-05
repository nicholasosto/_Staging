// @ts-nocheck
/// <reference types="@rbxts/types" />

/**
 * @file        task-cli.ts
 * @module      TaskCLI
 * @layer       scripts
 * @description CLI to manage tasks.yaml.
 */

import fs from "fs";
import yaml from "js-yaml";
import { Task, TaskStatus } from "../tasks/TaskTypes";

const TASK_FILE = "./tasks/tasks.yaml";

function load(): Task[] {
	return yaml.load(fs.readFileSync(TASK_FILE, "utf8")) as Task[];
}

function save(tasks: Task[]) {
	fs.writeFileSync(TASK_FILE, yaml.dump(tasks, { noRefs: true }));
}

function list() {
	const tasks = load();
	c.table(
		tasks.map((t) => ({
			ID: t.id,
			Status: t.status,
			Title: t.title,
			"⏱ h": t.estimatedHours,
		})),
	);
}

function updateStatus(id: string, status: TaskStatus) {
	const tasks = load();
	const t = tasks.find((x) => x.id === id);
	if (!t) throw new Error(`Task ${id} not found`);
	t.status = status;
	t.updatedOn = new Date().toISOString().slice(0, 10);
	save(tasks);
	console.log(`✅ ${id} → ${status}`);
}

/* --- CLI routing (list|status) omitted for brevity --- */
