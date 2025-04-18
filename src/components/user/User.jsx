import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserData, logout } from "../../services/AuthServices";
import "./user.scss";

const User = () => {
	const navigate = useNavigate();
	const [userData, setuserData] = useState({});
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [user, loading, error] = useAuthState(auth);


	const toggleDropdown = () => {
		isDropdownOpen === false ? setIsDropdownOpen(true) : setIsDropdownOpen(false);
	};

	useEffect(() => {
		if (loading) return;
		if (!user) {
			navigate("/");
			return;
		}
		getUserData(user?.uid, setuserData);
	}, [user, loading]);
	if (user) {
		return (
			<div onClick={toggleDropdown} className="profile">
				<div className="profile__header">
					<img src="src\img\vite.svg" alt="Profile picture" />
					<div>
						<p>Hello!</p>
						<p>{`${userData.name}`}</p>
					</div>
				</div>
				{isDropdownOpen && (
					<div className="profile__dropdown">
						<button onClick={logout}>Sign out</button>
					</div>
				)}
			</div>
		);
	}
};

export default User;
