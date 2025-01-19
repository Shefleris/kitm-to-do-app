import "./header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import User from "../../user/User";

//GV: this seems wrong; maybe make a parametrized header component and use it only with pages that need header?

const Header = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const locationName = location.pathname.split("/");

	// return (
	// 	<nav>
	// 		<button onClick={() => navigate("/dashboard")}>{`<`}</button>
	// 		<div>
	// 			<h2>{props.pageTitle}</h2>
	// 		</div>
	// 		<div></div>
	// 	</nav>
	// );

	switch (locationName[1]) {
		case "dashboard":
			return (
				<nav>
					<User />
					<div>
						<h2>Dashboard</h2>
					</div>
					<div></div>
				</nav>
			);
		case "add-project":
		case "update-project":
			return (
				<nav>
					<button onClick={() => navigate("/dashboard")}>{`<`}</button>
					<div>
						<h2>Add project</h2>
					</div>
					<div></div>
				</nav>
			);

		case "projects":
			return (
				<nav>
					<button onClick={() => navigate("/dashboard")}>{`<`}</button>
					<div>
						<h2>Project Tasks</h2>
					</div>
					<div></div>
				</nav>
			);
		case "add-task":
			return (
				<nav>
					<button onClick={() => navigate("/dashboard")}>{`<`}</button>
					<div>
						<h2>Add task</h2>
					</div>
					<div></div>
				</nav>
			);
		default:
			break;
	}
};

export default Header;
