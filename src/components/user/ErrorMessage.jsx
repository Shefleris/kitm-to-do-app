const ErrorMessage = ({ errorObj }) => {
	/*
	let message = "something went wrong...";
	switch (errorObj?.code) {
		case "auth/invalid-credential":
			message = "The supplied auth credential is incorrect, malformed or has expired.";
			break;
		case "auth/invalid-email":
			message = "The email address is badly formatted.";
			break;
		case "auth/weak-password":
			message = "Password should be at least 6 characters (auth/weak-password)";
			break;
		case "auth/email-already-in-use":
			message = "The email address is already in use by another account.";
			break;
		default:
			break;
	}
	return <div>{message}</div>;
	*/

	return <div>{errorObj?.message ?? "something went wrong..."}</div>;
};

export default ErrorMessage;
