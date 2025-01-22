import { Link, useNavigate } from "react-router-dom";
import { TASK_PRIORITIES, TASK_STATES } from "../../constants/constants";
import { useProjectsContext } from "../../contexts/projectsContext";
import "./task.scss";

const Task = ({ task, formFactor, doRenderProjectLink = true, doRenderStatus = true }) => {
	const taskPriorityDisplayText = TASK_PRIORITIES.find((i) => i.key === task.taskPriority)?.displayText ?? task.taskPriority;
	const taskStateDisplayText = TASK_STATES.find((i) => i.key === task.taskState)?.displayText ?? task.taskState;

	const { projects, projectsLoading } = useProjectsContext();

	const navigate = useNavigate();

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
					<div>
						{renderProjectLink()}
						<Link to={"/tasks/" + task.id}>
							<h3>{task.taskName}</h3>
						</Link>
						<div className="split-columns">
							<div>{task.taskDeadline}</div>
							{renderStatus()}
						</div>
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
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							navigate("/update-task/" + task.id);
						}}
					>
						Edit
					</button>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							console.log("NOT IMPLEMENTED YET");
						}}
					>
						Delete
					</button>
				</div>

				// 				<>
				// 					<div className="card">
				// 						<div className="form">
				// 							<div className="form__field">
				// 								<div className="form-floating">
				// 									<input
				// 										type="text"
				// 										name="taskName"
				// 										className="form-control"
				// 										value={task.taskName}
				// 										placeholder="Task name"
				// 										disabled
				// 									/>
				// 									<label htmlFor="taskName">Task name</label>
				// 								</div>
				// 							</div>
				// 							<div className="form__field">
				// 								<div className="form-floating">
				// 									<textarea
				// 										name="taskDesc"
				// 										className="form-control"
				// 										value={task.taskDesc}
				// 										maxLength="300"
				// 										disabled
				// 									/>
				// 									<label htmlFor="taskDesc">Description</label>
				// 								</div>
				// 							</div>
				// 							<div className="form__field">
				// 								<div className="form-floating">
				// 									<input type="date" name="taskDeadline" className="form-control" value={task.taskDeadline} disabled />
				// 									<label htmlFor="taskDeadline">Deadline</label>
				// 								</div>
				// 							</div>
				// 							<div className="form__field">
				// 								<div className="form-floating">
				// 									<select name="taskState" className="form-control" value={task.taskState} disabled>
				// 										<option value={"not started"}>Not started</option>
				// 										<option value={"in progress"}>In progress</option>
				// 										<option value={"finished"}>Finished</option>
				// 									</select>
				// 									<label htmlFor="projectId">Select task state</label>
				// 								</div>
				// 							</div>
				// 							<div className="form__field">
				// 								<label>Assigned project</label>
				// 								{renderProjectLink()}
				// 							</div>
				// 						</div>
				// 					</div>
				// 				</>
			);
	}
};

export default Task;
