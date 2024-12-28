import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchProjects = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching', error);
        throw error;
    }
};

export default fetchProjects;