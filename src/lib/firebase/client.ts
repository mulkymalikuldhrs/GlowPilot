// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0zaikxZy7gMyA0cX-0RcAZGvtnR8eIXo",
    authDomain: "mulkymalikuldhr-s-projects.firebaseapp.com",
    projectId: "mulkymalikuldhr-s-projects",
    storageBucket: "mulkymalikuldhr-s-projects.appspot.com",
    messagingSenderId: "705987898649",
    appId: "1:705987898649:web:489f82e797a60ba10e2988",
    measurementId: "G-SF9T87L0KP"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
