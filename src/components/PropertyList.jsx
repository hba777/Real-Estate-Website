// src/components/PropertyList.js

import { useEffect, useState } from "react";
import Card from "./Card";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col sm:grid md:grid-cols-2 xl:grid-cols-3 gap-5 m-5 p-5">
      {properties.map((property) => (
        <Card
          key={property.property_id}
          title={property.title}
          price={property.price}
          address={property.address} // Add address here
          bedrooms={property.bedrooms} // Add beds here
          baths={property.baths} // Add baths here
          area={property.area} // Add area here
        />
      ))}
    </div>
  );
};

export default PropertyList;
