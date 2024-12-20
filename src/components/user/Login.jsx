import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailAndPassword } from "../../services/AuthServices";

const Login = ({ onSuccessRedirectRoute }) => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	// const { user, loading, error, signInWithEmailAndPassword } = useAuthContext();
	const [user, loading, error] = useAuthState(auth);

	const navigate = useNavigate();

	//useEffect works like an event listener on AuthState
	useEffect(() => {
		// console.log("auth state effect in Login", user, error);

		if (loading) return;
		if (user) {
			//this effect happens when login form becomes no longer needed
			navigate(onSuccessRedirectRoute);
			return;
		}
	}, [loading, user]);

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log("login form data state", userData);
		signInWithEmailAndPassword(userData.email, userData.password);
	};

	//TODO: error handling

	if (user) {
		return <div>already signed in</div>;
	}

	//TODO: purely UI components in separate JSX files
	return (
		<>
			<h2>Sign in</h2>
			<form onSubmit={submitHandler}>
				<input name="email" value={userData.email} onChange={handleChange} type="email" placeholder="email" />
				<input name="password" onChange={handleChange} type="password" placeholder="password" />
				<button type="sign">Sign in</button>
				<Link to="/register">Register</Link>
			</form>
			{error && <div>something went wrong...</div>}
		</>
	);
	//the value attribute in input displays back what is in the state;
	//not really useful in this case (form won't be shown if user is authenticated)
};

export default Login;
