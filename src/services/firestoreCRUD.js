import firebase from "../firebase";
import {db} from "../firebase";
import {doc, getDoc, addDoc, updateDoc, deleteDoc,  collection} from "firebase/firestore"; 

//@POST
export const addDocument = async (data, collectionName = "projects") => {
	try {
		const docRef = await addDoc(collection(db, collectionName), data)		
		return docRef.id
	} catch (error) {
		console.error(error);
	}
};

//@UPDATE
export const updateDocument = async (id, data, collectionName = "projects") => {
	try {
		await updateDoc(doc(db, collectionName, id), {
			...data
		})
	} catch (error) {
		console.error(error);
	}
};

// @GET document by :id 
export const getDocumentById = async (id, collectionName = "projects") => {
	try {
		const docRef = await getDoc(doc(db, collectionName, id))
		return docRef.data()
	} catch (error) {
		console.error(error);
	}
};

//@DELETE document
export const deleteDocument = (id, collectionName = "projects") => {
	try {
		deleteDoc(doc(db, collectionName, id));
	} catch (error) {
		console.error(error);
	}
};
