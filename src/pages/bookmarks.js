import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
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
          const bookmarks = userData.bookmarks || []; // Default to an empty array
          console.log("Bookmarks fetched:", bookmarks); // Debugging log
          setBookmarkedProperties(bookmarks);
        } else {
          console.warn("User data not found in Firestore.");
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

  if (loading || isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your bookmarks.</p>;
  }

  if (
    !Array.isArray(bookmarkedProperties) ||
    bookmarkedProperties.length === 0
  ) {
    return <p>No bookmarks found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookmarks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarkedProperties.map((property, index) => (
          <PropertyCard
            key={index} // Fallback to index for unique key
            images={property.images}
            price={property.price}
            address={property.locality}
            bedrooms={property.bedrooms}
            baths={property.baths}
            area={property.area}
          />
        ))}
      </div>
    </div>
  );
}
