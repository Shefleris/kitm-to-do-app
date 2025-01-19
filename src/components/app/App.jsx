import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../user/Login";
import Register from "../user/Register";
import ProjectList from "../ProjectList/ProjectList";
import ProjectPage from "../ProjectPage/ProjectPage";
import AddProject from "../addProject/AddProject";
import TaskList from "../taskList/TaskList";
import TaskPage from "../task/TaskPage";
import AddTask from "../addTask/AddTask";
import Dashboard from "../dashboard/Dashboard";
import User from "../user/User";
import AppLayout from "../ui/AppLayout";

function App() {
	//routing: path="/" should lead to landing only when not signed in, otherwise to dashboard
	//achieve this with useNavigate in landing component?
	//landing page uses separate layout without Header and NavBar
	//component layout architecture: on certain occasions render the whole page in specific ways (like landing),
	// for most other cases have a container layout with header and navbar that renders route-specific content inside
	// header content should be tied to the routed page content
	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Login onSuccessRedirectRoute="/dashboard" />}
					/>
					<Route
						path="/login"
						element={<Login onSuccessRedirectRoute="/dashboard" />}
					/>
					<Route
						path="/register"
						element={<Register onSuccessRedirectRoute="/dashboard" />}
					/>
					<Route element={<AppLayout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/user" element={<User />} />
						<Route path="/projects" element={<ProjectList />} />
						<Route path="/projects/:projectId" element={<ProjectPage />} />
						<Route path="/add-project" element={<AddProject />} />
						<Route path="/update-project/:id" element={<AddProject />} />
						<Route path="/tasks" element={<TaskList />} />
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
