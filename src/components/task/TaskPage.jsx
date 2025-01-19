import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/AuthServices";
import * as service from "../../services/TasksServices";
import Task from "../task/Task";
import { useParams } from "react-router-dom";
import LoadingPlaceholder from "../ui/LoadingPlaceholder";
import { useProjectsContext } from "../../contexts/projectsContext";

//TODO: make editable form, also merge with AddTask

const TaskPage = () => {
	const params = useParams();
	const taskId = params.taskId;

	const [taskData, setTaskData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [user, authLoading, authError] = useAuthState(auth);
	const { projects, projectsLoading } = useProjectsContext();

	useEffect(() => {
		const getTask = async (id) => {
			try {
				const data = await service.showById(id);
				// console.log("loaded single task", id, data);

				//TODO: figure out how to properly await projectsLoading
				if (!projectsLoading && projects?.length) {
					data.projectName = projects.find((project) => project.id === data.projectId.name);
				}

				setTaskData(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (authLoading) return;
		if (user) {
			getTask(taskId);
		}
	}, [user, authLoading, taskId, projectsLoading, projects]);

	return loading ? <LoadingPlaceholder>wait...</LoadingPlaceholder> : <Task formFactor="full" task={taskData} />;
};

export default TaskPage;
