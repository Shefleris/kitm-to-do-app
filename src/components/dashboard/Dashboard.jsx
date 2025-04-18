import TaskList from "../taskList/TaskList";
import ProjectList from "../ProjectList/ProjectList";

const Dashboard = () => {
	return (
		<>
			<p style={{ whiteSpace: "pre" }}>
				{`
this is the default homepage the user sees first, a summary of ongoing tasks
if there is no data yet, a CTA message should be displayed with links to create tasks or projects

pseudo-structure (based on Figma design):
	<hello user>
	<message of the day>
	<taskList filter="inProgress" view="quickStatus">
	<projectList view="quickStatus">
			`}
			</p>
			<TaskList filter={{ taskState: ["in progress"] }} />
			<ProjectList></ProjectList>
		</>
	);
};

export default Dashboard;
