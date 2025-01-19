import { Link } from "react-router-dom";

const Task = ({ task, formFactor, doRenderProjectLink = true, doRenderStatus = true }) => {
	const renderProjectLink = () => {
		return (
			doRenderProjectLink &&
			task.projectId && (
				<Link to={"/projects/" + task.projectId}>
					<div>{task.projectName ?? `project ${task.projectId}`}</div>
				</Link>
			)
		);
	};

	const renderStatus = () => {
		return doRenderStatus && <div>{task.taskState}</div>;
	};

	switch (formFactor) {
		case "listItem":
			return (
				<div className="task-card">
					{renderProjectLink()}
					<Link to={"/tasks/" + task.id}>
						<h3>{task.taskName}</h3>
					</Link>
					<div className="split-columns">
						<div>{task.taskDeadline}</div>
						{renderStatus()}
					</div>
				</div>
			);
			break;
		case "progress":
			return (
				<div>
					{renderProjectLink()}
					<Link to={"/tasks/" + task.id}>
						<h3>{task.taskName}</h3>
					</Link>
					<div className="progressbar">{"[progress bar taskDeadline]"}</div>
				</div>
			);
		case "full":
		default: //should look similar to editable form in AddTask
			return (
				<div>
					<label>Task</label>
					<h3>{task.taskName}</h3>
					<label>Description</label>
					<p>{task.taskDesc}</p>
					<label>Deadline</label>
					<div>{task.taskDeadline}</div>
					<label>Status</label>
					<div>{task.taskState}</div>
					<label>Project</label>
					{renderProjectLink()}
				</div>
			);
	}
};

export default Task;
