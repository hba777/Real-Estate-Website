// src/components/PropertyList.js

import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Card from "./card";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);
        // Limit the data to 10 items
        setProperties(data.slice(0, 10));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const router = useRouter();

  const handleCardClick = (property) => {
  // Save the property data in session storage
  sessionStorage.setItem('selectedProperty', JSON.stringify(property));

  // Navigate to the details page
  router.push(`/properties/propertyDetails`);
};


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col sm:grid md:grid-cols-2 xl:grid-cols-3 gap-5 m-5 p-5">
      {properties.map((property) => (
        <Card
        key={property.property_id}
        title={property.property_type}
        price={property.price}
        address={property.address}
        bedrooms={property.bedrooms}
        baths={property.baths}
        area={property.area_marla || property.area}
        images={property.images} // Pass images to Card
        onClick={() => handleCardClick(property)}
        />
      ))}
    </div>
  );
};

export default PropertyList;
