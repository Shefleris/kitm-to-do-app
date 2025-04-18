import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../user/Login";
import Register from "../user/Register";
import ProjectList from "../ProjectList/ProjectList";
import ProjectPage from "../ProjectPage/ProjectPage";
import AddProject from "../addProject/AddProject";
import TaskListWithFilter from "../taskList/TaskListWithFilter";
import TaskPage from "../task/TaskPage";
import AddTask from "../addTask/AddTask";
import Dashboard from "../dashboard/Dashboard";
import User from "../user/User";
import AppLayout from "../ui/AppLayout";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Login onSuccessRedirectRoute="/dashboard" />} />
					<Route path="/login" element={<Login onSuccessRedirectRoute="/dashboard" />} />
					<Route path="/register" element={<Register onSuccessRedirectRoute="/dashboard" />} />
					<Route element={<AppLayout />}>
						<Route path="/dashboard" element={<ProjectList />} />
						<Route path="/projects" element={<ProjectList />} />
						<Route path="/projects/:projectId" element={<ProjectPage />} />
						<Route path="/add-project" element={<AddProject />} />
						<Route path="/update-project/:id" element={<AddProject />} />
						<Route path="/tasks" element={<TaskListWithFilter />} />
						<Route path="/tasks/:taskId" element={<TaskPage />} />
						<Route path="/add-task" element={<AddTask />} />
						<Route path="/update-task/:id" element={<AddTask />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
