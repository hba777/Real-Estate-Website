import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/utils/firebase";
import SearchResultCard from "@/components/SearchResultCard";
import PropertyCard from "@/components/propertyCard";
import PropertyDetailsTable from "@/components/propertyDetailsTable";
import PropertyMapButton from "@/components/Map";
import BookmarkButton from "@/components/bookmarkButton";
import WhatsAppButton from "@/components/whatsappBtn";

export default function Bookmarks() {
  const [user, loading] = useAuthState(auth);
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (selectedProperty) {
    // Display selected property details
    return (
      <div className="container mx-auto p-4">
        <button
          onClick={() => setSelectedProperty(null)}
          className="mb-4 bg-gray-200 px-4 py-2 rounded"
        >
          Back to Bookmarks
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-5 bg-white shadow-lg rounded-lg p-5">
          <PropertyCard
            images={selectedProperty.images}
            price={selectedProperty.price}
            address={selectedProperty.locality}
            bedrooms={selectedProperty.bedrooms}
            baths={selectedProperty.baths}
            area={selectedProperty.area}
          />

          <div className="ml-0 md:ml-9 mt-4 md:mt-0 p-3 flex flex-col gap-3">
            <PropertyMapButton property={selectedProperty} />
            <BookmarkButton property={selectedProperty} />
            <WhatsAppButton />
          </div>
        </div>

        <div className="mt-6 bg-white shadow-lg rounded-lg p-5">
          <PropertyDetailsTable property={selectedProperty} />
        </div>
      </div>
    );
  }

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
              onClick={() => setSelectedProperty(property)} // Set selected property
            />
          </div>
        ))}
      </div>
    </div>
  );
}
