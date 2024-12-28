import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropertyCard from "@/components/propertyDetailsComponents/propertyCard";
import PropertyDetailsTable from "@/components/propertyDetailsComponents/propertyDetailsTable";
import UpdatePropertyForm from "@/components/AdminComps/UpdatePropertyForm";

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProperty, setUpdatedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedProperty = sessionStorage.getItem("selectedProperty");
    if (storedProperty) {
      const propertyData = JSON.parse(storedProperty);
      setProperty(propertyData);
      setUpdatedProperty(propertyData); // Initialize the updated property
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (updatedPropertyData) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/updateproperty/${property.property_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPropertyData), // Send updated property data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the property");
      }

      sessionStorage.setItem(
        "selectedProperty",
        JSON.stringify(updatedPropertyData)
      );

      alert("Property updated successfully!");
      router.push(`/property-details/${property.property_id}`);
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update the property");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!property) {
    return <p>No property data available.</p>;
  }

  return (
    <div className="container mx-auto px-10 mt-20 flex flex-col lg:flex-row md:flex-row">
      <div className="flex flex-col lg:flex-row items-center gap-5 p-5">
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
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-5">
        <PropertyDetailsTable property={property} />
      </div>

      {/* Update Property Form Section */}
      {isEditing && (
        <UpdatePropertyForm
          property={updatedProperty}
          onSubmit={handleSubmit} // Pass the handleSubmit function
          onCancel={handleEditToggle}
        />
      )}

      {/* Edit Property Button */}
      <div className="mt-5 text-center">
        <button
          onClick={handleEditToggle}
          className="p-3 bg-blue-500 text-white rounded"
        >
          {isEditing ? "Cancel" : "Edit Property"}
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
