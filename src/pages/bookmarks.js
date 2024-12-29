// import { useState, useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { firestore, auth } from "@/utils/firebase";
// import SearchResultCard from "@/components/SearchResultCard";
// import { useRouter } from "next/router";

// export default function Bookmarks() {
//   const [user, loading] = useAuthState(auth);
//   const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchBookmarks = async () => {
//       if (!user) {
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const userRef = doc(firestore, "users", user.uid);
//         const userSnapshot = await getDoc(userRef);

//         if (userSnapshot.exists()) {
//           const userData = userSnapshot.data();
//           let bookmarks = userData.bookmarks || [];

//           bookmarks = bookmarks.filter(
//             (bookmark) => typeof bookmark === "object"
//           );

//           setBookmarkedProperties(bookmarks);
//         } else {
//           console.warn("User data not found in Firestore.");
//           setBookmarkedProperties([]);
//         }
//       } catch (error) {
//         console.error("Error fetching bookmarks:", error);
//         setBookmarkedProperties([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (!loading) {
//       fetchBookmarks();
//     }
//   }, [user, loading]);

//   const handleCardClick = (property) => {
//     // Save the property data in session storage
//     sessionStorage.setItem("selectedProperty", JSON.stringify(property));

//     // Navigate to the details page
//     router.push(`/properties/propertyDetails`);
//   };
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   if (
//     !Array.isArray(bookmarkedProperties) ||
//     bookmarkedProperties.length === 0
//   ) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h2>No bookmarks</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 mt-24 px-10">
//       <h4 className="text-2xl text-gray-800 font-medium leading-tight text-center">
//         All Your bookmarks appear here
//       </h4>
//       <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {bookmarkedProperties.map((property) => (
//           <div key={property.property_id}>
//             <SearchResultCard
//               images={property.images}
//               price={property.price}
//               address={property.locality}
//               bedrooms={property.bedrooms}
//               baths={property.baths}
//               area={property.area}
//               onClick={() => handleCardClick(property)} // Set selected property
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/utils/firebase";
import SearchResultCard from "@/components/searchComponents/SearchResultCard";
import { useRouter } from "next/router";

export default function Bookmarks() {
  const [user, loading] = useAuthState(auth);
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Set up state for the selected property type and city
  const [propertyType, setPropertyType] = useState("House");
  const [city, setCity] = useState("Islamabad");

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

          // Ensure bookmarks are filtered correctly
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

  // Filter properties based on selected property type and city
  const filteredProperties = bookmarkedProperties.filter(
    (property) =>
      property.property_type === propertyType && property.city === city // Ensure city matches the selected one
  );

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

  return (
    <div className="container mx-auto p-4  px-10 bg-[#fafafa] min-h-screen">
      <h4 className="text-2xl text-gray-800 font-medium leading-tight text-center mt-24 mb-5">
        All Your bookmarks appear here
      </h4>

      {/* Property Type and City Filter Dropdowns */}
      <div className="w-full mx-auto bg-white shadow-lg rounded-lg grid gap-3 grid-cols-2">
        <div className="p-5">
          <label
            htmlFor="property_type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Property Type
          </label>
          <select
            id="property_type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-500 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
          >
            <option value="House">House</option>
            <option value="Plots">Plots</option>
            <option value="Commercial">Commercial</option>
            <option value="Upper Portion">Upper Portion</option>
            <option value="Flat">Flat</option>
          </select>
        </div>
        <div className="p-5">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-500 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
          >
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            {/* Add more cities as needed */}
          </select>
        </div>
      </div>

      {/* Display bookmarks or No bookmarks message */}
      {filteredProperties.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h2>No bookmarks</h2>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 px-16">
          {filteredProperties.map((property) => (
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
      )}
    </div>
  );
}
