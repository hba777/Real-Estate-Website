import { useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(); // Initialize Firestore

const GoogleSignInButton = () => {
  const [user, setUser] = useState(null); // State to track user info

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      // Prepare user data
      const userData = {
        Email: loggedInUser.email,
        id: loggedInUser.uid, // Store the Firebase UID as the document ID
        Image: loggedInUser.photoURL || "/default-profile-pic.jpg", // Fallback image
        pushToken: "", // Add logic for push notifications if needed
        Name: loggedInUser.displayName || "Anonymous",
      };

      // Save user data to Firestore
      const userDoc = doc(db, "users", loggedInUser.uid); // Use UID as the document ID
      await setDoc(userDoc, userData, { merge: true }); // Merge to avoid overwriting existing data

      console.log("User signed in and data saved:", userData);

      // Set the signed-in user data in state
      setUser(userData);
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  // Check if user is already signed in on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If user is signed in, fetch the user info from Firebase
        const userData = {
          Email: currentUser.email,
          id: currentUser.uid,
          Image: currentUser.photoURL || "/default-profile-pic.jpg",
          Name: currentUser.displayName || "Anonymous",
        };
        setUser(userData); // Update state with user info
      } else {
        setUser(null); // Set user to null if not signed in
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center gap-2">
      {user ? (
        // If user is signed in, show profile image in a circle
        <img
          src={user.Image} // Display user's image or fallback to default image
          alt={user.Name}
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
      ) : (
        // If user is not signed in, show Google sign-in button
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 px-4 py-2 bg-green-400 rounded shadow hover:bg-green-300"
        >
          <FcGoogle className="text-xl" />
          <span>Sign in with Google</span>
        </button>
      )}
    </div>
  );
};

export default GoogleSignInButton;
