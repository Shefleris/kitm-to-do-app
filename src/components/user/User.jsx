import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserData, logout } from "../../services/AuthServices";


const User = () => {
	const navigate = useNavigate();
	const [userData, setuserData] = useState({});

	// const { user, loading, error, getUserData } = useAuthContext();
	const [user, loading, error] = useAuthState(auth);

	// const navigate = useNavigate();

	useEffect(() => {
		// console.log("auth state effect in User", user, error);

		if (loading) return;
		if (!user) {
			//this effect triggers when auth state changes (e.g. logout)
			// //TODO: proper routing; redirect to landing view when not signed in?
			navigate("/");
			return;
		}
		getUserData(user?.uid, setuserData);
	}, [user, loading]);

	//in the app design this should render as a panel that comes up when clicking user icon in navbar

	//TODO: purely UI components in separate JSX files
	if (user) {
		//logout action will affect the auth state and trigger an effect, causing actions like re-render or redirect
		return (
			<div>
				<div>
					<div>Hello!</div>
					<div>{`${userData.name}`}</div>
				</div>
				<button onClick={logout}>Sign out</button>
			</div>
		);
	}
	// return (
	// 	<nav>
	// 		<Link className="signin-register-btn" to="/login">Sign in / register</Link>
	// 	</nav>
	// );
};

export default User;
