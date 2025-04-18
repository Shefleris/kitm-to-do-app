import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getTasks = async (uid, queryParams) => {
	const queryConditions = [where("uid", "==", uid)];
	if (queryParams?.projectId) {
		queryConditions.push(where("projectId", "==", queryParams.projectId));
	}
	if (queryParams?.taskState?.length) {
		queryConditions.push(where("taskState", "in", queryParams.taskState));
	}
	if (queryParams?.taskPriority?.length) {
		queryConditions.push(where("taskPriority", "in", queryParams.taskPriority));
	}

	try {
		const queryRef = query(collection(db, "tasks"), ...queryConditions);

		const querySnapshot = await getDocs(queryRef);
		const parsedDocs = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
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
		return { id: docSnap.id, ...docSnap.data() };
	} catch (error) {
		console.error("Error fetching data: ", error);
		throw error;
	}
};
