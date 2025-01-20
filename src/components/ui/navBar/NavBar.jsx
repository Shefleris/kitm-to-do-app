import { Link } from "react-router-dom";
import './navbar.scss';

const NavBar = () => {
	return (
		<nav className="container__navbar">
			<Link to="/dashboard">Home</Link>
			{/* <Link to="/tasks">Tasks</Link> */}
			<Link to="/add-task">Add task</Link>
			<Link to="/add-project">Add project</Link>
			<Link to="/projects">Projects</Link>
			{/* <Link to="/user">User</Link> */}
		</nav>
	);
};

export default NavBar;
