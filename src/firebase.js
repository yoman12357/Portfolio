// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXkjF4qpl0wj-s45lyxtX8F6xXajfDqPo",
    authDomain: "portfolio-231fe.firebaseapp.com",
    projectId: "portfolio-231fe",
    storageBucket: "portfolio-231fe.firebasestorage.app",
    messagingSenderId: "1076299692139",
    appId: "1:1076299692139:web:b58d4dbebf47369896592e",
    measurementId: "G-Y85SCG013Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;