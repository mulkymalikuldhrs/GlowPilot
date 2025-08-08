// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

// Ensure the config is valid before proceeding.
if (!firebaseConfig.apiKey) {
    throw new Error('Missing Firebase API key. Please check your .env.local file.');
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig as FirebaseOptions);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics if running in the browser and it's supported
if (typeof window !== 'undefined') {
    isSupported().then(supported => {
        if (supported) {
            getAnalytics(app);
        }
    });
}


export { app, auth, db, googleProvider };
