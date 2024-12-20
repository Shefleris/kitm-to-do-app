import firebase from "../firebase";
import app from "../firebase";
import "firebase/compat/auth";

const auth = app.auth();
const db = app.firestore();

const getUserData = (uid, setUser) => {
	if (!uid) return;
	try {
		db.collection("Users")
			.where("uid", "==", uid)
			.get()
			.then((userData) => setUser(userData.docs[0].data()));
	} catch (error) {
		console.error(error);
	}
};

const signInWithEmailAndPassword = async (email, password) => {
	try {
		await auth.signInWithEmailAndPassword(email, password);
	} catch (error) {
		console.error(error);
		// throw error;
	}
};

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await auth.createUserWithEmailAndPassword(email, password);
		const user = res.user;
		await db.collection("Users").add({
			uid: user.uid,
			name,
			authProvider: "local",
			email,
		});
	} catch (error) {
		console.error(error);
		// throw error;
	}
};

const logout = () => {
	auth.signOut();
};

export default firebase;

export { auth, getUserData, signInWithEmailAndPassword, registerWithEmailAndPassword, logout };
