import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../user/Login";
import Register from "../user/Register";
import User from "../user/User";
import ProjectList from "../ProjectList/ProjectList";
import ProjectPage from "../ProjectPage/ProjectPage";

import "./App.css";

function App() {
	//routing: path="/" should lead to landing only when not signed in, otherwise to dashboard
	//achieve this with useNavigate in landing component?
	return (
		<>
			<Router>
				<h1>Hello World</h1>
				<User />
				<Routes>
					<Route path="/" element={<div>{"default view"}</div>} />
					<Route path="/dashboard" element={<div>{"tasks dashboard"}</div>} />
					<Route path="/login" element={<Login onSuccessRedirectRoute="/dashboard" />} />
					<Route path="/register" element={<Register onSuccessRedirectRoute="/dashboard" />} />
					<Route path="/projects" element={<ProjectList />} />
                    <Route path="/projects/:projectId" element={<ProjectPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;