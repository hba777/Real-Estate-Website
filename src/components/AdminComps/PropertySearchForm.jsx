"use client";

import React, { useState } from "react";

export default function PropertySearchForm({ onSubmit }) {
  const [city, setCity] = useState("Islamabad");
  const [location, setLocation] = useState("");
  const [property_type, setPropertyType] = useState("House");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data into an object
    const query = {
      city,
      location,
      property_type,
      priceMin,
      priceMax,
      areaMin,
      areaMax,
      bedrooms,
    };

    // Call the onSubmit function passed from the parent with the query data
    onSubmit(query);
  };

  return (
    <div className="transform -translate-y-5 w-full max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <div id="card-section">
        <div className="px-6 py-4">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
              >
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="property_type"
                className="block text-sm font-medium text-gray-700"
              >
                Property Type
              </label>
              <select
                id="property_type"
                value={property_type}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
              >
                <option value="House">House</option>
                <option value="Plots">Plots</option>
                <option value="Commercial">Commercial</option>
                <option value="Upper Portion">Upper Portion</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (PKR)
              </label>
              <div className="flex space-x-2">
                <input
                  id="priceMin"
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                />
                <input
                  id="priceMax"
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700"
              >
                Area (Marla)
              </label>
              <div className="flex space-x-2">
                <input
                  id="areaMin"
                  type="number"
                  value={areaMin}
                  onChange={(e) => setAreaMin(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                />
                <input
                  id="areaMax"
                  type="number"
                  value={areaMax}
                  onChange={(e) => setAreaMax(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bedrooms"
                className="block text-sm font-medium text-gray-700"
              >
                Bedrooms
              </label>
              <input
                id="bedrooms"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder="Bedrooms"
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
              />
            </div>
            {/* here  */}
          </form>
        </div>
        <div className="px-6 py-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-colors duration-300"
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
}
