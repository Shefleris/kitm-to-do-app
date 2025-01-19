import "./ProjectList.scss";
import { useNavigate, Link } from "react-router-dom";
import { useProjectsContext } from "../../contexts/projectsContext";
import LoadingPlaceholder from "../ui/LoadingPlaceholder";

const ProjectList = () => {
	const error = null;
	const { projects, projectsLoading } = useProjectsContext(); //TODO: error handling
	const navigate = useNavigate();
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
