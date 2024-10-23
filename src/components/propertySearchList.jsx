import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import Card from './Card';

const PropertySearchList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { location_id, property_type, priceMin, priceMax, areaMin, areaMax, bedrooms } = router.query;

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("/api/location");
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        // Handle the fetched data (e.g., set it to state)
        console.log(data); // For now, just logging the data
      } catch (error) {
        // Handle any error that occurs during the fetch
        console.error("Error fetching location:", error)
      } 
    };
  
    fetchLocation(); // Call the async function
  }, []); 
  

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        // Filter properties based on query parameters
        const filteredProperties = data.filter((property) => {
          return (
            //(!city || property.location_id === city) &&
            (!location_id || (property.location_id && property.location_id.toLowerCase().includes(location_id.toLowerCase()))) &&
            (!property_type || (property.property_type && property.property_type.toLowerCase() === property_type.toLowerCase())) &&
            (!priceMin || property.price >= parseInt(priceMin)) &&
            (!priceMax || property.price <= parseInt(priceMax)) &&
            (!areaMin || property.area_marla >= parseInt(areaMin)) &&
            (!areaMax || property.area_marla <= parseInt(areaMax)) &&
            (!bedrooms || property.bedrooms == bedrooms)
          );
        });

        // Limit to 10 items
        setProperties(filteredProperties.slice(0, 10));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchProperties();
    }
  }, [router.isReady,
     //city,
      location_id, property_type, priceMin, priceMax, areaMin, areaMax, bedrooms]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {properties.length > 0 ? (
        properties.map((property) => (
          <Card
            key={property.property_id}
            title={property.title}
            price={property.price}
            address={property.address}
            bedrooms={property.bedrooms} 
            baths={property.baths}
            area={property.area}
          />
        ))
      ) : (
        <div>No properties found matching your criteria.</div>
      )}
    </div>
  );
};

export default PropertySearchList;
