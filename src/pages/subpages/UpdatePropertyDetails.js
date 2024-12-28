import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropertyCard from "@/components/propertyDetailsComponents/propertyCard";
import PropertyDetailsTable from "@/components/propertyDetailsComponents/propertyDetailsTable";
import UpdatePropertyForm from "@/components/AdminComps/UpdatePropertyForm";

const UpdatePropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProperty, setUpdatedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch the property data from session storage when the component mounts
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

  // Toggle the edit form visibility
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle the form submission to update the property
  const handleSubmit = async (updatedPropertyData) => {
    try {
      const propertyId = property.property_id;

      // Ensure property ID exists before making the API call
      if (!propertyId) {
        throw new Error("Property ID is missing or invalid.");
      }

      // Send updated property data to the server via PUT request
      const response = await fetch(`/api/updateproperty/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPropertyData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the property.");
      }

      // Update session storage with the new property data
      sessionStorage.setItem(
        "selectedProperty",
        JSON.stringify(updatedPropertyData)
      );

      // Show success message
      alert("Property updated successfully!");

      // Reload the page to reflect changes
      router.reload(); // This will refresh the page and get the updated data
    } catch (error) {
      console.error("Error updating property:", error);
      alert(`Failed to update the property: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading message if the data is still being fetched
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Show error message if no property data is available
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
          onSubmit={handleSubmit} // Pass the handleSubmit function to handle form submission
          onCancel={handleEditToggle} // Pass the toggle function to handle cancel
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

export default UpdatePropertyDetails;
