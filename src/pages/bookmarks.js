import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Import updateDoc for updating Firestore
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/utils/firebase";
import PropertyCard from "@/components/PropertyCard";

export default function Bookmarks() {
  const [user, loading] = useAuthState(auth);
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const userRef = doc(firestore, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          let bookmarks = userData.bookmarks || []; // Default to an empty array if undefined

          // Normalize bookmarks to ensure they're all objects
          bookmarks = bookmarks.filter(
            (bookmark) => typeof bookmark === "object"
          ); // Only keep objects

          console.log("Normalized Bookmarks fetched:", bookmarks); // Debugging log
          setBookmarkedProperties(bookmarks);
        } else {
          console.warn("User data not found in Firestore.");
          setBookmarkedProperties([]); // Set to empty array if user data is missing
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setBookmarkedProperties([]); // Ensure fallback to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchBookmarks();
    }
  }, [user, loading]);

  const handleRemoveBookmark = async (propertyId) => {
    if (!user) return; // Ensure user is authenticated

    try {
      const userRef = doc(firestore, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        let updatedBookmarks = userData.bookmarks || [];

        // Debugging log to ensure we are receiving the correct propertyId
        console.log("Removing property with id:", propertyId);

        // Remove the clicked property from the bookmarks array using its property_id
        updatedBookmarks = updatedBookmarks.filter(
          (property) => property.property_id !== propertyId
        );

        // Debugging log to verify the updated bookmarks array
        console.log("Updated bookmarks:", updatedBookmarks);

        // Update the Firestore document
        await updateDoc(userRef, {
          bookmarks: updatedBookmarks,
        });

        // Remove the property from the local state as well
        setBookmarkedProperties(updatedBookmarks);
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  // If loading or user is not authenticated, no messages will be shown
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If no bookmarks found, display the "No bookmarks" message
  if (
    !Array.isArray(bookmarkedProperties) ||
    bookmarkedProperties.length === 0
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>No bookmarks</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarkedProperties.map((property) => (
          <div key={property.property_id} className="relative">
            <PropertyCard
              images={property.images}
              price={property.price}
              address={property.locality}
              bedrooms={property.bedrooms}
              baths={property.baths}
              area={property.area}
            />
            <button
              onClick={() => handleRemoveBookmark(property.property_id)} // Use property_id
              className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
