import { Link } from "react-router-dom";
import { TASK_PRIORITIES, TASK_STATES } from "../../constants/constants";
import { useProjectsContext } from "../../contexts/projectsContext";

const Task = ({ task, formFactor, doRenderProjectLink = true, doRenderStatus = true }) => {
	const taskPriorityDisplayText = TASK_PRIORITIES.find((i) => i.key === task.taskPriority)?.displayText ?? task.taskPriority;
	const taskStateDisplayText = TASK_STATES.find((i) => i.key === task.taskState)?.displayText ?? task.taskState;

	const { projects, projectsLoading } = useProjectsContext();

	const renderProjectLink = () => {
		return (
			doRenderProjectLink &&
			task.projectId && (
				<Link to={"/projects/" + task.projectId}>
					<div>
						{task.projectName ??
							(!projectsLoading && projects.find((project) => project.id === task.projectId)?.name) ??
							`project ${task.projectId}`}
					</div>
				</Link>
			)
		);
	};

	const renderStatus = () => {
		return doRenderStatus && <div>{taskStateDisplayText}</div>;
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
					<label>Start date</label>
					<div>{task.taskStart}</div>
					<label>End date (deadline)</label>
					<div>{task.taskDeadline}</div>
					<label>Priority</label>
					<div>{taskPriorityDisplayText}</div>
					<label>Status</label>
					{renderStatus()}
					<label>Project</label>
					{renderProjectLink()}
				</div>
			);
	}
};

export default Task;
