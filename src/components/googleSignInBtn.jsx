import { useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Image from "next/image";

const db = getFirestore();

export default function GoogleSignInButton() {
  const [user, setUser] = useState(null); // Track user info
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown

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

      setUser(userData);
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      setUser(null); // Clear user state
      setShowDropdown(false); // Hide dropdown
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

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
    <div className="relative">
      {user ? (
        <div className="relative">
          <Image
            src={user.Image}
            alt={user.Name}
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow">
              <button
                onClick={handleSignOut}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
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
}
