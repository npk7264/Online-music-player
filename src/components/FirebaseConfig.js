// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqOf6iEW12NdtG9ohOujD4AUfzcG0kdgc",
    authDomain: "musicapp-416e6.firebaseapp.com",
    projectId: "musicapp-416e6",
    storageBucket: "musicapp-416e6.appspot.com",
    messagingSenderId: "390671815312",
    appId: "1:390671815312:web:81c6f8bf63a1d672537e15",
    measurementId: "G-FMLK43X27N"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

export default db;
