import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/utils/firebase";
import SearchResultCard from "@/components/SearchResultCard";
import { useRouter } from "next/router";


export default function Bookmarks() {
  const [user, loading] = useAuthState(auth);
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  

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
          let bookmarks = userData.bookmarks || [];

          bookmarks = bookmarks.filter(
            (bookmark) => typeof bookmark === "object"
          );

          setBookmarkedProperties(bookmarks);
        } else {
          console.warn("User data not found in Firestore.");
          setBookmarkedProperties([]);
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setBookmarkedProperties([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchBookmarks();
    }
  }, [user, loading]);

  const handleCardClick = (property) => {
    // Save the property data in session storage
    sessionStorage.setItem("selectedProperty", JSON.stringify(property));

    // Navigate to the details page
    router.push(`/properties/propertyDetails`);
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );


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
          <div key={property.property_id}>
            <SearchResultCard
              images={property.images}
              price={property.price}
              address={property.locality}
              bedrooms={property.bedrooms}
              baths={property.baths}
              area={property.area}
              onClick={() => handleCardClick(property)} // Set selected property
            />
          </div>
        ))}
      </div>
    </div>
  );
}
