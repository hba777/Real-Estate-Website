import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const db = getFirestore();

const BookmarkButton = ({ property }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        setUserId(user.uid);
      } else {
        setIsSignedIn(false);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleBookmarkClick = async () => {
    if (!isSignedIn) {
      router.push("/signin");
      return;
    }

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        bookmarks: arrayUnion(property), // Add entire property details to bookmarks
      });

      setIsBookmarked(true);
      console.log(`Property ${property.property_id} bookmarked successfully.`);
    } catch (error) {
      console.error("Error bookmarking property:", error);
    }
  };

  return (
    <button
      onClick={handleBookmarkClick}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
    >
      {isBookmarked ? (
        <BsBookmarkFill className="text-lg text-blue-500" />
      ) : (
        <BsBookmark className="text-lg" />
      )}
      <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
    </button>
  );
};

export default BookmarkButton;
