import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const db = getFirestore();

export default function Header() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const makeAdmin = async () => {
    if (user) {
      // Show a prompt for the password
      const password = window.prompt("Enter the admin password:");

      // Check if the password matches
      if (password === "123") {
        const userRef = doc(db, "users", user.id);
        await setDoc(userRef, { role: "admin" }, { merge: true });
        alert("You are now an admin!");
        setShowDropdown(false);

        // Update the user state dynamically
        setUser((prevUser) => ({
          ...prevUser,
          role: "admin",
        }));
      } else {
        alert("Incorrect password. Access denied.");
      }
    }
  };

  const makeUser = async () => {
    if (user) {
      const userRef = doc(db, "users", user.id);
      await setDoc(userRef, { role: "user" }, { merge: true });
      alert("You are now a User!");
      setShowDropdown(false);

      // Update the user state dynamically
      setUser((prevUser) => ({
        ...prevUser,
        role: "user",
      }));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      const userData = {
        Email: loggedInUser.email,
        id: loggedInUser.uid,
        Image: loggedInUser.photoURL || "/default-profile-pic.jpg",
        Name: loggedInUser.displayName || "Anonymous",
        role: "user", // Default role
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
      await signOut(auth);
      setUser(null);
      setShowDropdown(false);
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.exists() ? userDoc.data() : null;

        if (userData) {
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    });

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      unsubscribe();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "bg-transparent" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div
            className={`flex items-center space-x-2 ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            <span
              className={`text-xl font-bold px-4 py-2 transition-all duration-300 rounded-md ${
                scrolled ? "border-transparent" : "border-black"
              } bg-transparent text-black`}
            >
              <Link href="/">LONA</Link>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center">
            <Link
              href="/"
              className={`px-4 py-2 text-sm transition ${
                scrolled
                  ? "bg-black text-white rounded-l-full"
                  : "bg-white text-black rounded-l-full"
              } hover:bg-gray-10`} // Lighter hover effect
            >
              Home
            </Link>
            <Link
              href="https://wa.me/03345098296" // Replace <PHONE_NUMBER> with the actual number
              target="_blank" // Opens WhatsApp Web in a new tab
              rel="noopener noreferrer" // Adds security
              className={`px-4 py-2 text-sm transition ${
                scrolled ? "bg-black text-white" : "bg-white text-black"
              } hover:bg-gray-10`} // Lighter hover effect
            >
              Contact Us
            </Link>

            <Link
              href="/bookmarks"
              className={`px-4 py-2 text-sm transition ${
                scrolled
                  ? "bg-black text-white rounded-r-full"
                  : "bg-white text-black rounded-r-full"
              } hover:bg-gray-10`} // Lighter hover effect
            >
              Bookmarks
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Sign-in Button */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <Image
                    src={user.Image}
                    alt={user.Name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md">
                      <p className="px-4 py-2 text-sm text-gray-600 border-b">
                        {user.Name}
                      </p>
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>

                      {user && user.role !== "admin" && (
                        <button
                          onClick={makeAdmin}
                          className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
                        >
                          Make Me Admin
                        </button>
                      )}
                      {/* Admin Dashboard Link */}
                      {user && user.role === "admin" && (
                        <div>
                          <Link
                            href="/adminDashboard"
                            className={`px-4 py-2 text-sm transition ${
                              scrolled
                                ? "bg-black text-white"
                                : "bg-white text-black"
                            } hover:bg-gray-10`}
                          >
                            Admin Dashboard
                          </Link>
                          <button
                            onClick={makeUser}
                            className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
                          >
                            Make Me User
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                    scrolled
                      ? "bg-black text-white hover:bg-gray-700"
                      : "bg-white text-black hover:bg-gray-100"
                  } sm:text-sm`} // Smaller text size on mobile
                >
                  <FcGoogle className="text-xl" />
                  <span className="text-xs sm:text-sm">
                    Sign in with Google
                  </span>{" "}
                  {/* Adjust text size */}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
