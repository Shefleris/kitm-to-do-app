import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain ,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app)

export default firebase;

export {
    app,
    db
}