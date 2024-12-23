import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import the MapComponent
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const PropertyForm = ({
  formData,
  setFormData,
  handleSubmit,
  editingProperty,
}) => {
  const [latitude, setLatitude] = useState(formData.latitude || 33.6844); // Default to Islamabad if not set
  const [longitude, setLongitude] = useState(formData.longitude || 73.0479); // Default to Islamabad if not set
  const [areaInSqFt, setAreaInSqFt] = useState(formData.area || ""); // Store square feet value
  const [areaInMarla, setAreaInMarla] = useState(formData.area_marla || ""); // Store Marla value

  // Populate form data for editing if editingProperty exists
  useEffect(() => {
    if (editingProperty) {
      setLatitude(editingProperty.latitude);
      setLongitude(editingProperty.longitude);
      setAreaInSqFt(editingProperty.area || "");
      setAreaInMarla(editingProperty.area_marla || "");
      setFormData(editingProperty);
    }
  }, [editingProperty]);

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the area in square feet changes, automatically convert to Marla
    if (name === "area") {
      const sqFt = value;
      setAreaInSqFt(sqFt);
      const marla = (parseFloat(sqFt) / 272.25).toFixed(2); // Convert to Marla
      setAreaInMarla(marla);
      setFormData((prev) => ({
        ...prev,
        area: sqFt,
        area_marla: marla,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission (Add or Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate numeric fields
    const price = parseFloat(formData.price);
    const area = parseFloat(formData.area);
    const areaMarla = parseFloat(formData.area_marla);

    // Check for invalid numbers (NaN)
    if (isNaN(price) || isNaN(area) || isNaN(areaMarla)) {
      alert("Please provide valid numbers for price and area.");
      return;
    }

    // Assuming the formData object has all the necessary properties
    const propertyData = {
      property_type: formData.property_type,
      location_id: formData.location_id,
      date_added: new Date().toISOString(),
      price: price,
      area: area,
      area_marla: areaMarla,
      baths: formData.baths,
      bedrooms: formData.bedrooms,
      latitude,
      longitude,
    };

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        alert("Property added successfully!");
      } else {
        alert("Error adding property!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingProperty ? "Edit Property" : "Add New Property"}
      </h2>

      {/* Property Type */}
      <div className="mb-4">
        <label
          htmlFor="property_type"
          className="block text-sm font-medium text-gray-700"
        >
          Property Type
        </label>
        <input
          type="text"
          id="property_type"
          name="property_type"
          value={formData.property_type || ""}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter property type"
          required
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location (Latitude, Longitude)
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter location address"
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter price"
          required
        />
      </div>

      {/* Area (sq ft) */}
      <div className="mb-4">
        <label
          htmlFor="area"
          className="block text-sm font-medium text-gray-700"
        >
          Area (sq ft)
        </label>
        <input
          type="number"
          id="area"
          name="area"
          value={areaInSqFt || ""}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter area in square feet"
          required
        />
      </div>

      {/* Area in Marla */}
      <div className="mb-4">
        <label
          htmlFor="area_marla"
          className="block text-sm font-medium text-gray-700"
        >
          Area (in Marla)
        </label>
        <input
          type="number"
          id="area_marla"
          name="area_marla"
          value={areaInMarla || ""}
          readOnly
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Area in Marla (calculated)"
        />
      </div>

      {/* Baths */}
      <div className="mb-4">
        <label
          htmlFor="baths"
          className="block text-sm font-medium text-gray-700"
        >
          Baths
        </label>
        <input
          type="number"
          id="baths"
          name="baths"
          value={formData.baths || ""}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter number of baths"
          required
        />
      </div>

      {/* Bedrooms */}
      <div className="mb-4">
        <label
          htmlFor="bedrooms"
          className="block text-sm font-medium text-gray-700"
        >
          Bedrooms
        </label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={formData.bedrooms || ""}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter number of bedrooms"
          required
        />
      </div>

      {/* Map Container */}
      <div className="mb-4" style={{ height: "300px" }}>
        <MapComponent
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setFormData={setFormData}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          {editingProperty ? "Update Property" : "Add Property"}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
