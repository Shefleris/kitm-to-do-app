import "./register.scss"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../services/AuthServices";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";

const Register = ({ onSuccessRedirectRoute }) => {
	const [userData, setUserData] = useState({
		name: "",
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
		registerWithEmailAndPassword(userData.name, userData.email, userData.password, setLatestError);
	};

	if (user) {
		return <div>already signed in</div>;
	}

	return (
		<div className="container-div">
			<div className="form-div">
				<img className="register__img" src="src/img/female-sitting-on-the-floor.png" alt="decorative image" />
				<h2 className="register-heading">Register</h2>
				<form className="form-element" onSubmit={submitHandler}>
					<div className="form__field">
						<div className="form-floating">
							<input className="form-control" name="name" value={userData.name} onChange={handleChange} type="text" placeholder="Username" />
							<label htmlFor="name">Username</label>
						</div>
					</div>
					<div className="form__field">
						<div className="form-floating">
							<input className="form-control" name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Email" />
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="form__field">
						<div className="form-floating">
							<input className="form-control" name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Password" />
							<label htmlFor="password">Password</label>
						</div>
					</div>
					<button className="register-btn" type="submit">Register</button>
					<Link to="/login">Login</Link>
				</form>
				{latestError && <ErrorMessage errorObj={latestError} />}
			</div>
		</div>
	);
};

export default Register;
