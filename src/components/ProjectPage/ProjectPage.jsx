import "./projectPage.css";
import React, { useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import TaskList from "../taskList/TaskList";
import { useProjectsContext } from "../../contexts/projectsContext";
import LoadingPlaceholder from "../ui/LoadingPlaceholder";

const ProjectPage = () => {
	const location = useLocation();
	// const projectName = location.state?.projectName || "Unknown Project";
	const [filter, setFilter] = useState("All");
	const projectId = location.pathname.split("/")[2];
	const navigate = useNavigate();
	const { projects, projectsLoading } = useProjectsContext();

	if (projectsLoading) {
		return <LoadingPlaceholder>loading...</LoadingPlaceholder>;
	}

	const projectData = projects.find((project) => project.id === projectId);

	const handleEdit = () => {
		navigate(`/update-project/${projectId}`);
	};

	// const filteredTasks = filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

	return (
		<div className="project-page">
			<div className="project__header">
				<h1>{projectData.name}</h1>
				<button onClick={handleEdit}>Edit</button>
			</div>
			<div className="task-filters">
				<button className="button__filter" onClick={() => setFilter("All")}>
					All
				</button>
				<button className="button__filter" onClick={() => setFilter("To Do")}>
					To Do
				</button>
				<button className="button__filter" onClick={() => setFilter("In Progress")}>
					In Progress
				</button>
			</div>
			{/* <div className="task-list">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div key={task.id} className="task-card">
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                            <p>
                                <strong>Status:</strong> {task.status}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </div> */}
			<TaskList filter={{ projectId: projectId, status: filter }} />
		</div>
	);
};

export default ProjectPage;
