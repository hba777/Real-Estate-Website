// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuUA_ydm907XzVZ6zbi20KnwP-x9VYZhM",
  authDomain: "real-estate-website-81132.firebaseapp.com",
  projectId: "real-estate-website-81132",
  storageBucket: "real-estate-website-81132.firebasestorage.app",
  messagingSenderId: "263669733820",
  appId: "1:263669733820:web:4106d385a397b32123f3b9",
  measurementId: "G-89P3TJR24S",
};

// Initialize Firebase app (ensures app is initialized only once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app); // Analytics only works in the browser
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app); // Initialize Firestore

export { app, analytics, auth, googleProvider, firestore };
