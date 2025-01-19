import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/AuthServices";
import * as service from "../../services/TasksServices";
import Task from "../task/Task";
import { useProjectsContext } from "../../contexts/projectsContext";
import LoadingPlaceholder from "../ui/LoadingPlaceholder";

const TaskList = (filter) => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [user, authLoading, authError] = useAuthState(auth);
	const { projects, projectsLoading } = useProjectsContext();
	// const [filterByStatus, setFilterByStatus] = useState(null);
	// const [filterByDate, setfilterByDate] = useState(null);
	//filters will come from props in this component

	useEffect(() => {
		const getTasksList = async () => {
			try {
				const data = await service.getTasks(user.uid, filter);
				// console.log(data);

				//TODO: figure out how to properly await projectsLoading
				if (!projectsLoading && projects?.length) {
					data.forEach((task) => (task.projectName = projects.find((project) => project.id === task.projectId).name));
				}

				setTasks(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (authLoading) return;
		if (user) {
			getTasksList();
		}
	}, [user, authLoading, projectsLoading, projects, filter]);

	if (loading) {
		return <LoadingPlaceholder>wait...</LoadingPlaceholder>;
	}

	return (
		<>
			{tasks?.length ? (
				tasks.map((task, index) => (
					<Task key={task.id || index} formFactor="listItem" task={task} /*doRenderProjectLink={!("projectId" in filter)}*/></Task>
				))
			) : (
				<p>No tasks matching the filter</p>
			)}
		</>
	);
};

export default TaskList;
