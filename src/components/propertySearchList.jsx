import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchResultCard from "./SearchResultCard";

export default function PropertySearchList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;

  const router = useRouter();
  const {
    city,
    location,
    property_type,
    priceMin,
    priceMax,
    areaMin,
    areaMax,
    bedrooms,
  } = router.query;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProperties = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/properties", { signal });
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json().then();
        console.log("API Data:", data);
        setLoading(false);

        // Filter properties based on query parameters
        const filteredProperties = data.filter((property) => {
          return (
            (!city || (property.city && property.city === city)) && // Exact match for city
            (!property_type ||
              (property.property_type &&
                property.property_type === property_type)) && // Exact match for property type
            (!location ||
              (property.locality &&
                property.locality
                  .toLowerCase()
                  .includes(location.toLowerCase()))) &&
            (!priceMin || property.price >= parseInt(priceMin)) &&
            (!priceMax || property.price <= parseInt(priceMax)) &&
            (!areaMin || property.area_marla >= parseInt(areaMin)) &&
            (!areaMax || property.area_marla <= parseInt(areaMax)) &&
            (!bedrooms || property.bedrooms == bedrooms)
          );
        });

        console.log("Filtered Properties:", filteredProperties);

        setProperties(filteredProperties);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      }
    };

    if (router.isReady) {
      fetchProperties();
    }

    // Cleanup function to abort any ongoing fetch request when dependencies change
    return () => {
      controller.abort();
    };
  }, [
    router.isReady,
    city,
    location,
    property_type,
    priceMin,
    priceMax,
    areaMin,
    areaMax,
    bedrooms,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (property) => {
    // Save the property data in session storage
    sessionStorage.setItem("selectedProperty", JSON.stringify(property));

    // Navigate to the details page
    router.push(`/properties/propertyDetails`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const totalPages = Math.ceil(properties.length / resultsPerPage);

  const paginatedProperties = properties.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  console.log(totalPages);

  return (
    <div className="min-h-screen px-5">
      {paginatedProperties.length > 0 ? (
        <div>
          <div className="grid gap-3 grid-cols-1">
            {paginatedProperties.map((property) => (
              <div
                key={property.property_id}
                className="w-full sm:w-full md:w-[90%] lg:w-full mx-auto"
              >
                <SearchResultCard
                  price={property.price}
                  address={property.locality}
                  bedrooms={property.bedrooms}
                  baths={property.baths}
                  area={property.area}
                  images={property.images}
                  onClick={() => handleCardClick(property)}
                  className="w-full h-[calc(100%+10px)] sm:h-[calc(100%+10px)] md:h-[calc(100%+20px)] lg:h-[calc(100%+20px)]" // Adjust card height for mobile and larger screens
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2 mb-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-20">
          No properties found matching your criteria.
        </div>
      )}
    </div>
  );
}
