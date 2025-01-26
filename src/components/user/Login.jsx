import "./login.scss";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailAndPassword } from "../../services/AuthServices";
import ErrorMessage from "./ErrorMessage";

const Login = ({ onSuccessRedirectRoute }) => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	// const handleLogin = async () => {
	// 	// Simulate login logic
	// 	const isLoginSuccessful = true;
	// 	if (isLoginSuccessful) {
	// 		navigate(onSuccessRedirectRoute || "/dashboard");
	// 	}
	// };

	const [latestError, setLatestError] = useState(null);

	// const { user, loading, error, signInWithEmailAndPassword } = useAuthContext();
	const [user, loading, error] = useAuthState(auth);

	const navigate = useNavigate();

	//useEffect works like an event listener on AuthState
	useEffect(() => {
		// console.log("auth state effect in Login", user, loading, error);

		if (loading) return;
		if (user) {
			//this effect happens when login form becomes no longer needed
			navigate(onSuccessRedirectRoute);
			return;
		}
	}, [loading, user, error, navigate, onSuccessRedirectRoute]);

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log("login form data state", userData);
		setLatestError(null);
		signInWithEmailAndPassword(userData.email, userData.password, setLatestError);
	};

	//TODO: error handling

	//React Firebase Hooks - Auth:
	// useAuthState checks authentication status and tracks when it changes between successfully connected and none;
	// useSignInWithEmailAndPassword wraps the Firebase login operation in a state hook form; it also returns the user identity on success;
	// which of these hooks to use, or use both?
	// useSignInWithEmailAndPassword already does what our AuthService does and more, but we don't want to circumvent the service module

	if (user) {
		return <div>already signed in</div>;
	}

	//TODO: purely UI components in separate JSX files
	return (
		<div className="container__login">
			<div className="form__login">
				<img className="login__img" src="src/img/female-sitting-on-the-floor.png" alt="decorative image" />
				<h2>Sign in</h2>
				<form onSubmit={submitHandler}>
					<div className="form__field">
						<div className="form-floating">
							<input className="form-control" name="email" value={userData.email} onChange={handleChange} type="email" placeholder="email" />
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="form__field">
						<div className="form-floating">
							<input className="form-control" name="password" onChange={handleChange} type="password" placeholder="password" />
							<label htmlFor="password">Password</label>
						</div>
					</div>
					<button className="register-btn" type="sign">Sign in</button>
					<Link to="/register">Register</Link>
				</form>

				{latestError && <ErrorMessage errorObj={latestError} />}
			</div>
		</div>
	);
	//the value attribute in input displays back what is in the state;
	//not really useful in this case (form won't be shown if user is authenticated)
};

export default Login;
