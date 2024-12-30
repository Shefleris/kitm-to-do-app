import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../services/AuthServices";
import ErrorMessage from "./ErrorMessage";

const Register = ({ onSuccessRedirectRoute }) => {
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [latestError, setLatestError] = useState(null);

	// const { user, loading, error, registerWithEmailAndPassword } = useAuthContext();
	const [user, loading, error] = useAuthState(auth);

	const navigate = useNavigate();

	//useEffect works like an event listener on AuthState
	useEffect(() => {
		// console.log("auth state effect in Register", user, error);

		if (loading) return;
		if (user) {
			//this effect happens when register form becomes no longer needed
			navigate(onSuccessRedirectRoute);
			return;
		}
	}, [loading, user, error, navigate, onSuccessRedirectRoute]);

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log("register form data state", userData);
		setLatestError(null);
		registerWithEmailAndPassword(userData.name, userData.email, userData.password, setLatestError);
	};

	//TODO: error handling

	if (user) {
		return <div>already signed in</div>;
	}

	//TODO: purely UI components in separate JSX files
	return (
		<>
			<div className="form-div">
				<h2 className="register-heading">Register</h2>
				<form className="form-element" onSubmit={submitHandler}>
					<input className="form-input" name="name" value={userData.name} onChange={handleChange} type="text" placeholder="Username" />
					<input className="form-input" name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Email" />
					<input className="form-input" name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Password" />
					<button className="register-btn" type="submit">Register</button>
				</form>
				{latestError && <ErrorMessage errorObj={latestError} />}
			</div>
		</>
	);
	//the value attribute in input displays back what is in the state;
	//not really useful in this case (form won't be shown if user is authenticated)
};

export default Register;
