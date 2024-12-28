import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchResultCard from "../searchComponents/SearchResultCard";

export default function UpdatePropertyList({ searchQuery }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9; // Display 9 results per page (3x3 grid)

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
        const response = await fetch("/api/getProperty", { signal });
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
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
            (!bedrooms || property.bedrooms == bedrooms) &&
            (!searchQuery || // Apply searchQuery filter
              property.locality
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
          );
        });

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
    searchQuery, // Add searchQuery as a dependency
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (property) => {
    sessionStorage.setItem("selectedProperty", JSON.stringify(property));
    router.push(`subpages/UpdatePropertyDetails`);
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

  return (
    <div className="min-h-screen px-5">
      {paginatedProperties.length > 0 ? (
        <div>
          {/* Grid layout for 3x3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-w-screen-lg mx-auto">
            {paginatedProperties.map((property) => (
              <div key={property.property_id} className="relative">
                <SearchResultCard
                  price={property.price}
                  address={property.locality}
                  bedrooms={property.bedrooms}
                  baths={property.baths}
                  area={property.area}
                  images={property.images}
                  onClick={() => handleCardClick(property)}
                  className="w-full h-full"
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
