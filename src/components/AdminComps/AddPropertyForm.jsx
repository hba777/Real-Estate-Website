"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

// Dynamically import the Map component
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function AddPropertyForm() {
  const [formData, setFormData] = useState({
    area: "",
    area_marla: "",
    baths: "",
    bedrooms: "",
    city: "Rawalpindi",
    date_added: "2019-06-20T19:00:00.000Z",
    images: [],
    latitude: 33.547162288216,
    longitude: 73.131689429283,
    price: "",
    property_id: "",
    property_type: "",
    province_name: "",
    locality: "",
    location_id: "",
  });
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
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...encodedImages],
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch("/api/addproperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        router.push("/adminDashboard");

        // Show success message
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        // Show error message
      }
    } catch (error) {
      console.error("Error calling API:", error);
      // Show generic error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.h2>
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
                        key === "area_marla" ||
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-white" // Added text-white for bright white text
                    />
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

            {formData.images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Uploaded Images
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative border rounded-md overflow-hidden shadow-md bg-white"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <img
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">
                          Image {index + 1}
                        </span>
                      </div>
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

          <div className="px-6 py-4 bg-gray-50 text-right">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              Submit Property
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
