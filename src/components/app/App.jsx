import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../user/Login";
import Register from "../user/Register";
import ProjectList from "../ProjectList/ProjectList";
import ProjectPage from "../ProjectPage/ProjectPage";
import AddProject from "../addProject/AddProject";
import Header from "../header/Header";
import AddTask from "../addTask/AddTask";

function App() {
	//routing: path="/" should lead to landing only when not signed in, otherwise to dashboard
	//achieve this with useNavigate in landing component?
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Login/>} />
					<Route path="/dashboard" element={<ProjectList/>} />
					<Route path="/login" element={<Login onSuccessRedirectRoute="/dashboard" />} />
					<Route path="/register" element={<Register onSuccessRedirectRoute="/dashboard" />} />
					<Route path="/projects/:projectId" element={<ProjectPage />} />
					<Route path="/add-project" element={<AddProject/>}/>
					<Route path="/update-project/:id" element={<AddProject/>}/>
					<Route path="/add-task" element={<AddTask/>}/>
					<Route path="/update-task/:id" element={<AddTask/>}/>
				</Routes>
			</Router>
		</>
	)
}

export default App;