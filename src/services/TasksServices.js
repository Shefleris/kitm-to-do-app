import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getTasks = async (uid, queryParams) => {
	const queryConditions = [where("uid", "==", uid)];
	//TODO: process and append queryParams to firebase format queryConditions (not all implemented yet!!!)
	if (queryParams?.projectId) {
		queryConditions.push(where("projectId", "==", queryParams.projectId));
	}
	if (queryParams?.taskState?.length) {
		queryConditions.push(where("taskState", "in", queryParams.taskState));
	}
	if (queryParams?.taskPriority?.length) {
		queryConditions.push(where("taskPriority", "in", queryParams.taskPriority));
	}
	//TODO: text fragment search (not so straightforward? https://firebase.google.com/docs/firestore/solutions/search)
	if (queryParams?.taskName) {
		queryConditions.push(where("taskName", "==", queryParams.taskName));
	}

	try {
		const queryRef = query(collection(db, "tasks"), ...queryConditions);
		// console.log(queryRef);

		const querySnapshot = await getDocs(queryRef);
		const parsedDocs = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		// console.log("parsedDocs", parsedDocs);
		return parsedDocs;
	} catch (error) {
		console.error("Error fetching data: ", error);
		throw error;
	}
};

export const showById = async (id) => {
	try {
		const docRef = db.collection("tasks").doc(id);
		const docSnap = await getDoc(docRef);
		console.log("fetch task by id", id, docSnap.data());
		return docSnap.data();
	} catch (error) {
		console.error("Error fetching data: ", error);
		throw error;
	}
};
