import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SearchResultCard from "./SearchResultCard";

export default function PropertySearchList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const resultsPerPage = 12; // 3 columns * 4 rows = 12 results per page

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

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProperties = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/properties?page=${currentPage}&resultsPerPage=${resultsPerPage}`,
          { signal }
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setLoading(false);

        // Append new properties to the list (no filtering here)
        setProperties((prevProperties) => [...prevProperties, ...data]);

        setHasMore(data.length > 0); // If no new properties, stop infinite scroll
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      }
    };

    if (router.isReady) {
      fetchProperties();
    }

    return () => {
      controller.abort();
    };
  }, [router.isReady, currentPage]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;

    // Check if we've scrolled to the bottom
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight &&
      hasMore &&
      !loading
    ) {
      setCurrentPage((prevPage) => prevPage + 1); // Load more data
    }
  };

  const handleCardClick = (property) => {
    sessionStorage.setItem("selectedProperty", JSON.stringify(property));
    router.push(`/properties/propertyDetails`);
  };

  if (loading && currentPage === 1)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div
      ref={scrollContainerRef}
      className="min-h-screen px-4 sm:px-6 lg:px-8 overflow-y-auto max-w-screen-xl mx-auto"
      onScroll={handleScroll}
    >
      {properties.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {properties.map((property) => (
            <div
              key={property.property_id}
              className="sm:w-[48%] md:w-[32%] lg:w-[22%] xl:w-[20%] mx-auto"
            >
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
      ) : (
        <div className="text-gray-500 text-center mt-20">
          No properties found matching your criteria.
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
