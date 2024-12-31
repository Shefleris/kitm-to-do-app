import { collection, getDocs, query,where } from "firebase/firestore";
import { db } from "../firebase";

const fetchProjects = async (user_id) => {
    try {
        const queryRef = query(collection(db, "projects"), where("uid", "==", user_id)) 
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

export default fetchProjects;