export type TaskStatus = "Not Ready" | "Ready" | "Under Construction" | "Draft" | "Completed";

export interface Task {
	id: string; // unique key, e.g. TSK‑0001
	title: string;
	status: TaskStatus;
	estimatedHours: number;
	blockedBy: string[]; // ids
	blocksTask: string[]; // ids
	createdOn: string; // ISO‑8601
	updatedOn: string; // ISO‑8601
}

export type TaskList = Task[];
