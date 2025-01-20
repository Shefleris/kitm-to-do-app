import "./projectPage.css";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import TaskListWithFilter from "../taskList/TaskListWithFilter";
import { useProjectsContext } from "../../contexts/projectsContext";
import LoadingPlaceholder from "../ui/LoadingPlaceholder";

const ProjectPage = () => {
	const location = useLocation();
	// const projectName = location.state?.projectName || "Unknown Project";
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

	return (
		<div className="project-page">
			<div className="project__header">
				<h1>{projectData.name}</h1>
				<button onClick={handleEdit}>Edit</button>
			</div>
			<TaskListWithFilter
				applyDefaultFilter={{ projectId: projectId, taskState: ["not started", "in progress"] }}
				exceptionFields={["projectId"]}
				exceptionType="blacklist"
			/>
		</div>
	);
};

export default ProjectPage;
