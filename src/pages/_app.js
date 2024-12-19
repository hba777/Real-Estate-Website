// pages/_app.js
import Header from "@/components/header";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  // Google Sign-In logic
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      const userData = {
        Email: loggedInUser.email,
        id: loggedInUser.uid,
        Image: loggedInUser.photoURL || "/default-profile-pic.jpg",
        Name: loggedInUser.displayName || "Anonymous",
      };

      const userDoc = doc(db, "users", loggedInUser.uid);
      await setDoc(userDoc, userData, { merge: true });

      setUser(userData); // Update the state with signed-in user
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          Email: currentUser.email,
          id: currentUser.uid,
          Image: currentUser.photoURL || "/default-profile-pic.jpg",
          Name: currentUser.displayName || "Anonymous",
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Header handleGoogleSignIn={handleGoogleSignIn} user={user} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
