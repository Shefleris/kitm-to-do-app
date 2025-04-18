import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const fetchProjects = async (user_id) => {
	try {
		const queryRef = query(collection(db, "projects"), where("uid", "==", user_id));
		const querySnapshot = await getDocs(queryRef);
		const projects = querySnapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				name: data.projectName,
				description: data.projectDesc,
				startDate: data.projectStartDate,
				endDate: data.projectEndDate,
			};
		});
		console.log("Mapped project data:", projects);
		return projects;
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
};

/**
 * This creates a live listener that calls back on data changes in Firestore
 * @param {*} user_id
 * @param {*} onUpdateFn a function whose parameter is the data returned from db
 * @returns
 */
export const fetchProjectsWithUpdateCallback = async (user_id, onUpdateFn) => {
	try {
		const queryRef = query(collection(db, "projects"), where("uid", "==", user_id));
		onSnapshot(queryRef, (querySnapshot) => {
			const projects = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					name: data.projectName,
					description: data.projectDesc,
					startDate: data.projectStartDate,
					endDate: data.projectEndDate,
				};
			});
			onUpdateFn(projects);
		});
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
};
