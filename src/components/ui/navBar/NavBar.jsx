import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			<Link to="/dashboard">Home</Link>
			<Link to="/tasks">Tasks</Link>
			<Link to="/add-task">Add task</Link>
			<Link to="/projects">Projects</Link>
			<Link to="/user">User</Link>
		</nav>
	);
};

export default NavBar;
