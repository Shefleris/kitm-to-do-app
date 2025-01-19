import "./ProjectList.scss";
// import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import fetchProjects from "../../services/fetchProjects";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../services/AuthServices";
import { useProjectsContext } from "../../contexts/projectsContext";
import LoadingPlaceholder from "../ui/LoadingPlaceholder";

const ProjectList = () => {
	// const [projects, setProjects] = useState([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);
	const error = null;
	const { projects, projectsLoading } = useProjectsContext(); //TODO: error handling
	const navigate = useNavigate();
	// const [user, load, err] = useAuthState(auth);

	//     useEffect(() => {
	//         const getProjects = async () => {
	//             try {
	//                 const projectsData = await fetchProjects(user.uid);
	//                 console.log("Fetched projects data in ProjectList:", projectsData);
	//                 setProjects(projectsData);
	//                 console.log("Projects state after update:", projectsData);
	//             } catch (err) {
	//                 setError(err.message);
	//             } finally {
	//                 setLoading(false);
	//             }
	//     };

	//     getProjects();
	// }, [user]);

	const handleAddNewProject = () => {
		navigate("/add-project");
	};

	return (
		<div className="project-list-container">
			<div className="header">
				<h1>Projects</h1>
				<button className="add-project-btn" onClick={handleAddNewProject}>
					Add New Project
				</button>
			</div>
			{projectsLoading && (
				<LoadingPlaceholder>Loading projects...</LoadingPlaceholder>
			)}
			{error && <p>Error: {error}</p>}
			<div className="project-list">
				{!projectsLoading && projects.length > 0
					? projects.map((project, index) => (
							<div
								key={project.id || index}
								className="project-card"
								onClick={() =>
									navigate(`/projects/${project.id}`, {
										state: { projectName: project.name },
									})
								}
							>
								<h2>{project.name || "Unnamed Project"}</h2>
								<p>{project.description || "No description provided"}</p>
								<div className="project__dates">
									<p>
										<strong>Start Date:</strong>{" "}
										{project.startDate
											? new Date(project.startDate).toLocaleDateString()
											: "Invalid or Missing Date"}
									</p>
									<p>
										<strong>End Date:</strong>{" "}
										{project.endDate
											? new Date(project.endDate).toLocaleDateString()
											: "Invalid or Missing Date"}
									</p>
								</div>
							</div>
					  ))
					: !projectsLoading && (
							<p>
								No projects available.{" "}
								<Link to="/add-project">Create a new one!</Link>
							</p>
					  )}
			</div>
		</div>
	);
};

export default ProjectList;
