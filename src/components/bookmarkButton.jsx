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
  const [showSignInPopup, setShowSignInPopup] = useState(false);
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
      setShowSignInPopup(true);
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
    <>
      <button
        onClick={handleBookmarkClick}
        className="flex items-center gap-2 px-2 py-1.5 bg-black/20 rounded hover:bg-gray-300 transition"
      >
        {isBookmarked ? (
          <BsBookmarkFill className="text-lg text-blue-500" />
        ) : (
          <BsBookmark className="text-lg" />
        )}
        {/* <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span> */}
      </button>

      {showSignInPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Please sign in to bookmark properties
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowSignInPopup(false)}
                className="text-gray-500 hover:underline border border-black rounded px-4 py-2 transition"
              >
                Okay!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarkButton;
