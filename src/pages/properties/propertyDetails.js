import BookmarkButton from "@/components/bookmarkButton";
import PropertyMapButton from "@/components/Map";
import PropertyCard from "@/components/propertyCard";
import PropertyDetailsTable from "@/components/propertyDetailsTable";
import WhatsAppButton from "@/components/whatsappBtn";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PropertyDetails = () => {
  const router = useRouter();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyId = router.query.id;
      if (!propertyId) {
        return;
      }

      // Fetch the property details using the property ID
      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        if (!response.ok) throw new Error("Property not found");
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (router.query.id) {
      fetchProperty();
    }
  }, [router.query]);

  console.log("Property Details Screen", property);

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
            address={property.locality}
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
