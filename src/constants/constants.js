export const TASK_PRIORITIES = [
	{ key: "low", displayText: "Low" },
	{ key: "medium", displayText: "Medium" },
	{ key: "high", displayText: "High" },
];

export const TASK_STATES = [
	{ key: "not started", displayText: "Not started" },
	{ key: "in progress", displayText: "In progress" },
	{ key: "finished", displayText: "Finished" },
];

export const TASK_FILTER_FIELDS = {
	state: {
		displayFieldName: "Status",
		internalFieldName: "taskState",
	},
	priority: {
		displayFieldName: "Priority",
		internalFieldName: "taskPriority",
	},
	projectId: {
		displayFieldName: "Project",
		internalFieldName: "projectId",
	},
	name: {
		displayFieldName: "Task",
		internalFieldName: "taskName",
	},
};
