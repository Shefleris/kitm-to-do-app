import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import NavBar from "./navBar/NavBar";
import { ProjectsProvider } from "../../contexts/projectsContext";
//GV: already a bad practice: both UI and app logic in same place

const AppLayout = (props) => {
	//GV: would be cool to get pageTitle from Outlet, is it against React principles?
	return (
		<>
			<ProjectsProvider>
				<Header pageTitle={props.pageTitle} />
				<Outlet />
				<NavBar />
			</ProjectsProvider>
		</>
	);
};

export default AppLayout;
