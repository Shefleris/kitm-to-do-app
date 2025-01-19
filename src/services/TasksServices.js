import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getTasks = async (uid, queryParams) => {
	const queryConditions = [where("uid", "==", uid)];
	//TODO: process and append queryParams to firebase format queryConditions (not all implemented yet!!!)
	if (queryParams?.projectId) {
		queryConditions.push(where("projectId", "==", queryParams.projectId));
	}
	if (queryParams?.status === "To Do") {
		queryConditions.push(where("taskState", "==", "not started"));
	}
	if (queryParams?.status === "In Progress") {
		queryConditions.push(where("taskState", "==", "in progress"));
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
