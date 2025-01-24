import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/AuthServices";
import * as service from "../../services/TasksServices";
import Task from "../task/Task";
import { useProjectsContext } from "../../contexts/projectsContext";
import LoadingPlaceholder from "../ui/LoadingPlaceholder";

const TaskList = ({ filter }) => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [user, authLoading, authError] = useAuthState(auth);
	const { projects, projectsLoading } = useProjectsContext();

	useEffect(() => {
		const getTasksList = async () => {
			try {
				let data = await service.getTasks(user.uid, filter);

				//TODO: figure out how to properly await projectsLoading
				if (!projectsLoading && projects?.length) {
					data.forEach((task) => {
						task.projectName = projects.find((project) => project.id === task.projectId)?.name ?? undefined;
					});
				}

				// text fragment search in frontend
				if ((filter?.taskName ?? "").trim() !== "") {
					data = data.filter((task) => task.taskName.toLowerCase().includes(filter.taskName.toLowerCase()));
				}

				setTasks(data);
			} catch (err) {
				console.log(err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		//GV: not the best idea to wait for projectsLoading, better would be listing the tasks and dynamically updating their projectName when projects data is ready
		if (authLoading || projectsLoading) return;
		if (user) {
			getTasksList();
		}
	}, [user, authLoading, projectsLoading, projects, filter]);

	if (loading) {
		return <LoadingPlaceholder>wait...</LoadingPlaceholder>;
	}

	if (error) {
		return <>Something went wrong...</>;
	}

	return (
		<div>
			{tasks?.length ? (
				tasks.map((task, index) => (
					<Task
						key={task.id || index}
						formFactor="listItem"
						task={task}
						doRenderProjectLink={!(filter && "projectId" in filter && filter.projectId !== "")}
					></Task>
				))
			) : (
				<p>No tasks matching the filter</p>
			)}
		</div>
	);
};

export default TaskList;
