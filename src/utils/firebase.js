// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDuUA_ydm907XzVZ6zbi20KnwP-x9VYZhM",
  authDomain: "real-estate-website-81132.firebaseapp.com",
  projectId: "real-estate-website-81132",
  storageBucket: "real-estate-website-81132.firebasestorage.app",
  messagingSenderId: "263669733820",
  appId: "1:263669733820:web:4106d385a397b32123f3b9",
  measurementId: "G-89P3TJR24S"
};

let app;
let analytics;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export { app, analytics };
