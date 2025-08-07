
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0zaikxZy7gMyA0cX-0RcAZGvtnR8eIXo",
    authDomain: "glowpilot.firebaseapp.com",
    projectId: "glowpilot",
    storageBucket: "glowpilot.appspot.com",
    messagingSenderId: "705987898649",
    appId: "1:705987898649:web:489f82e797a60ba10e2988"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
