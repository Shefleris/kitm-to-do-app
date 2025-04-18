import "./login.scss";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailAndPassword } from "../../services/AuthServices";
import ErrorMessage from "./ErrorMessage";

const Login = ({ onSuccessRedirectRoute }) => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
	const [latestError, setLatestError] = useState(null);

	const [user, loading, error] = useAuthState(auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (loading) return;
		if (user) {
			navigate(onSuccessRedirectRoute);
			return;
		}
	}, [loading, user, error, navigate, onSuccessRedirectRoute]);

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setLatestError(null);
		signInWithEmailAndPassword(userData.email, userData.password, setLatestError);
	};

	if (user) {
		return <div>already signed in</div>;
	}

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
};

export default Login;
