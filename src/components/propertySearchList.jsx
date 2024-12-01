import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchResultCard from './SearchResultCard';

const PropertySearchList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { city, location, property_type, priceMin, priceMax, areaMin, areaMax, bedrooms } = router.query;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        // Filter properties based on query parameters
        const filteredProperties = data.filter((property) => {
          return (
            (!city || (property.city && property.city.toLowerCase() === city.toLowerCase())) &&
            (!location || (property.locality && property.locality.toLowerCase().includes(location.toLowerCase()))) &&
            (!property_type || (property.property_type && property.property_type.toLowerCase() === property_type.toLowerCase())) &&
            (!priceMin || property.price >= parseInt(priceMin)) &&
            (!priceMax || property.price <= parseInt(priceMax)) &&
            (!areaMin || property.area_marla >= parseInt(areaMin)) &&
            (!areaMax || property.area_marla <= parseInt(areaMax)) &&
            (!bedrooms || property.bedrooms == bedrooms)
          );
        });

        console.log(filteredProperties);
        setProperties(filteredProperties.slice(0, 10)); // Optionally limit the results
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchProperties();
    }
  }, [router.isReady, city, location, property_type, priceMin, priceMax, areaMin, areaMax, bedrooms]);

  const handleCardClick = (property) => {
    // Save the property data in session storage
    sessionStorage.setItem('selectedProperty', JSON.stringify(property));
  
    // Navigate to the details page
    router.push(`/properties/propertyDetails`);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen p-5">
      {properties.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <SearchResultCard
              key={property.property_id}
              title={property.title}
              price={property.price}
              address={property.address}
              bedrooms={property.bedrooms}
              baths={property.baths}
              area={property.area}
              images={property.images}
              onClick={() => handleCardClick(property)}
            />
          ))}
        </div>
      ) : (
        <div className="text-white text-center">No properties found matching your criteria.</div>
      )}
    </div>
  );
};

export default PropertySearchList;
