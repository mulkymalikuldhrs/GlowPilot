// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0zaikxZy7gMyA0cX-0RcAZGvtnR8eIXo",
    authDomain: "mulkymalikuldhr-s-projects.firebaseapp.com",
    projectId: "mulkymalikuldhr-s-projects",
    storageBucket: "mulkymalikuldhr-s-projects.firebasestorage.app",
    messagingSenderId: "705987898649",
    appId: "1:705987898649:web:851fc9327c2eac290e2988",
    measurementId: "G-HX5RWGS5K2"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics if running in the browser
if (typeof window !== 'undefined') {
    getAnalytics(app);
}


export { app, auth, googleProvider };
