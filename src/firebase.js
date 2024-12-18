// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBkXYsgZLb2KAffbbmQ2TeMp_31MC33OCk",
    authDomain: "followers-tracker-social-media.firebaseapp.com",
    projectId: "followers-tracker-social-media",
    storageBucket: "followers-tracker-social-media.firebasestorage.app",
    messagingSenderId: "595054627817",
    appId: "1:595054627817:web:a1a43f3808c9e725ac9978"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firestore'u başlat
const db = getFirestore(app);

export default db;
