import "./header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import User from "../../user/User";

//GV: this seems wrong; maybe make a parametrized header component and use it only with pages that need header?

const Header = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const locationName = location.pathname.split("/");

	switch (locationName[1]) {
		case "dashboard":
			return (
				<header>
					<User />
					<div>
						<h2>Projects</h2>
					</div>
					<div></div>
				</header>
			);
		case "add-project":
			return (
				<header>
					<button onClick={() => navigate("/dashboard")}>{`<`}</button>
					<div>
						<h2>Add project</h2>
					</div>
					<div></div>
				</header>
			);
		case "update-project":
			return (
				<header>
					<button onClick={() => navigate("/dashboard")}>{`<`}</button>
					<div>
						<h2>Update project</h2>
					</div>
					<div></div>
				</header>
			);

		case "projects":
			return (
				<header>
					<User />
					<div>
						<h2>Projects</h2>
					</div>
					<div></div>
				</header>
			);
		case "add-task":
			return (
				<header>
					<button onClick={() => navigate("/dashboard")}>{`<`}</button>
					<div>
						<h2>Add task</h2>
					</div>
					<div></div>
				</header>
			);
		case "tasks":
			return (
				<header>
					<button onClick={() => navigate("/dashboard")}>{`<`}</button>
					<div>
						<h2>Tasks</h2>
					</div>
					<div></div>
				</header>
			);
		default:
			break;
	}
};

export default Header;
