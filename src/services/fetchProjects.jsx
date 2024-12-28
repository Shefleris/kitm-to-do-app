import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchProjects = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "projects"));
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