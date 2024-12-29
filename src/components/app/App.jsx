import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../user/Login";
import Register from "../user/Register";
import User from "../user/User";
import LandingPage from "../landingPage/landingPage";
import ProjectList from "../ProjectList/ProjectList";
import ProjectPage from "../ProjectPage/ProjectPage";
import AddProject from "../addProject/AddProject";

function App() {
	//routing: path="/" should lead to landing only when not signed in, otherwise to dashboard
	//achieve this with useNavigate in landing component?
	return (
		<div className="app__container">
			<Router>
				<User />
				<Routes>
					<Route path="/" element={<LandingPage/>} />
					<Route path="/dashboard" element={<ProjectList/>} />
					<Route path="/login" element={<Login onSuccessRedirectRoute="/dashboard" />} />
					<Route path="/register" element={<Register onSuccessRedirectRoute="/dashboard" />} />
					<Route path="/projects/:projectId" element={<ProjectPage />} />
					<Route path="/add-project" element={<AddProject/>}/>
					<Route path="/update-project/:id" element={<AddProject/>}/>
				</Routes>
			</Router>
		</div>
	)
}

export default App;