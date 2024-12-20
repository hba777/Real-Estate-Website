import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const db = getFirestore();

const BookmarkButton = ({ property }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsSignedIn(true);
        setUserId(user.uid);

        // Check if property is already bookmarked
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const bookmarks = userData.bookmarks || [];
          const isAlreadyBookmarked = bookmarks.some(
            (bookmark) => bookmark.property_id === property.property_id
          );
          setIsBookmarked(isAlreadyBookmarked);
        }
      } else {
        setIsSignedIn(false);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, [property]);

  const handleBookmarkClick = async () => {
    if (!isSignedIn) {
      router.push("/signin");
      return;
    }

    const userRef = doc(db, "users", userId);

    try {
      if (isBookmarked) {
        // Remove bookmark
        await updateDoc(userRef, {
          bookmarks: arrayRemove(property),
        });
        setIsBookmarked(false);
        console.log(`Property ${property.property_id} removed from bookmarks.`);
      } else {
        // Add bookmark
        await updateDoc(userRef, {
          bookmarks: arrayUnion(property),
        });
        setIsBookmarked(true);
        console.log(
          `Property ${property.property_id} bookmarked successfully.`
        );
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
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
