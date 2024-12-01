import { useEffect, useState } from "react";
import Card from "./SearchResultCard";

const HomeCardComponent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties/home"); // Replace with your actual API endpoint for home properties
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProperties(data);
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
          key={property.id} // Ensure this is a unique ID from your data
          imageSrc={property.image} // Assuming your API returns an image field
          title={property.title}
          price={property.price}
        />
      ))}
    </div>
  );
};

const ApartmentCardComponent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties/apartment"); // Replace with your actual API endpoint for apartment properties
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProperties(data);
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
          key={property.id} // Ensure this is a unique ID from your data
          imageSrc={property.image} // Assuming your API returns an image field
          title={property.title}
          price={property.price}
        />
      ))}
    </div>
  );
};

export { HomeCardComponent, ApartmentCardComponent };
