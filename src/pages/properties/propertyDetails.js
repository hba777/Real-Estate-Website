import BookmarkButton from "@/components/bookmarkButton";
import PropertyMapButton from "@/components/propertyDetailsComponents/Map";
import PropertyCard from "@/components/propertyDetailsComponents/propertyCard";
import PropertyDetailsTable from "@/components/propertyDetailsComponents/propertyDetailsTable";
import WhatsAppButton from "@/components/whatsappBtn";
import { useEffect, useState } from "react";

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Retrieve the property from session storage
    const storedProperty = sessionStorage.getItem("selectedProperty");
    if (storedProperty) {
      setProperty(JSON.parse(storedProperty));
    }
  }, []);

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Property Card Section */}
      <div className="flex flex-col lg:flex-row items-center gap-5 bg-white shadow-lg rounded-lg p-5">
        <div
          key={property.property_id}
          className="flex flex-col md:flex-row items-center"
        >
          {/* Property Card */}
          <PropertyCard
            images={property.images}
            price={property.price}
            address={property.locality || property.address}
            bedrooms={property.bedrooms}
            baths={property.baths}
            area={property.area}
          />

          {/* Buttons Section */}
          <div className="ml-0 md:ml-9 mt-4 md:mt-0 p-3 flex flex-col gap-3">
            <PropertyMapButton property={property} />
            <BookmarkButton property={property} />
            <WhatsAppButton />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-5">
        <PropertyDetailsTable property={property} />
      </div>
    </div>
  );
};

export default PropertyDetails;
