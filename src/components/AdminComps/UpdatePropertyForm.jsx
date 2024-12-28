"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

// Dynamically import the Map component
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const UpdatePropertyForm = ({ onSubmit, property, onCancel }) => {
  const [formData, setFormData] = useState({
    price: "",
    address: "",
    bedrooms: "",
    baths: "",
    area: "",
    images: [], // All images (including newly uploaded ones)
    latitude: "",
    longitude: "",
  });

  const [newImages, setNewImages] = useState([]); // Track new images separately

  
  useEffect(() => {
    // If a property is passed, populate the form with the data
    if (property) {
      setFormData({
        price: property.price || "",
        address: property.address || "",
        bedrooms: property.bedrooms || "",
        baths: property.baths || "",
        area: property.area || "", // Set area in square feet
        images: property.images || [],
        latitude: property.latitude || "",
        longitude: property.longitude || "",
      });
    }
  }, [property]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const base64Images = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(base64Images).then((encodedImages) => {
      setNewImages((prevData) => [...prevData, ...encodedImages]);
    });
  };

  const handleImageRemove = (imageIndex, isNew) => {
    if (isNew) {
      setNewImages((prevData) =>
        prevData.filter((_, index) => index !== imageIndex)
      );
    } else {
      setFormData((prevData) => {
        const updatedImages = prevData.images.filter(
          (_, index) => index !== imageIndex
        );
        return {
          ...prevData,
          images: updatedImages,
        };
      });
    }
  };

  const handleDelete = async () => {
    try {
      console.log(property.property_id);

      setLoading(true);
      const response = await fetch(`/api/deleteproperty/${property.property_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/adminDashboard");
      } else {
        console.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Merge the new images into the form data before submitting
    const finalImages = [...formData.images, ...newImages];

    onSubmit({ ...formData, images: finalImages });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard - Property Form
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              {Object.keys(formData).map((key) => {
                if (key === "images") return null;
                return (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 capitalize"
                    >
                      {key.replace("_", " ")}
                    </label>
                    <input
                      type={
                        key === "area_square_feet" ||
                        key === "baths" ||
                        key === "bedrooms" ||
                        key === "price"
                          ? "number"
                          : "text"
                      }
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                    {errors[key] && (
                      <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Choose Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            {/* Section to show new images only */}
            {newImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  New Images
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {newImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative border rounded-md overflow-hidden shadow-md bg-white group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <img
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-black text-white rounded-full opacity-75 hover:opacity-100"
                        onClick={() => handleImageRemove(index, true)} // Remove from new images
                      >
                        X
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Section to show existing images */}
            {formData.images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Existing Images
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative border rounded-md overflow-hidden shadow-md bg-white group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <img
                        src={`data:image/jpeg;base64,${image}`}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-black text-white rounded-full opacity-75 hover:opacity-100"
                        onClick={() => handleImageRemove(index, false)} // Remove from existing images
                      >
                        X
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <label
                htmlFor="map"
                className="block text-sm font-medium text-gray-700"
              >
                Set Location on Map
              </label>
              <div className="mt-1 rounded-md overflow-hidden shadow-md">
                <MapComponent
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  setLatitude={(lat) =>
                    setFormData((prevData) => ({ ...prevData, latitude: lat }))
                  }
                  setLongitude={(lon) =>
                    setFormData((prevData) => ({ ...prevData, longitude: lon }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 text-right flex justify-end gap-4">
            <button
              type="submit"
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Property"}
            </button>

            <button
              type="button"
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={loading}
            >
              Delete Property
            </button>
          </div>
        </motion.form>
      </div>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Are you sure you want to delete this property?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePropertyForm;
