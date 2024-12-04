"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PropertySearchCard() {
  const [city, setCity] = useState("Islamabad");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("House");
  const [priceMin, setPriceMin] = useState("0");
  const [priceMax, setPriceMax] = useState("");
  const [areaMin, setAreaMin] = useState("0");
  const [areaMax, setAreaMax] = useState("");
  const [bedrooms, setBedrooms] = useState("1");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = {
      city,
      location,
      propertyType,
      priceMin,
      priceMax,
      areaMin,
      areaMax,
      bedrooms,
    };

    Object.keys(query).forEach((key) => {
      if (query[key] === "" || query[key] === "0") {
        delete query[key];
      }
    });

    router.push(`/search?${new URLSearchParams(query).toString()}`);
  };

  return (
    <div className="transform -translate-y-5 w-full max-w-xl mx-auto bg-white shadow-lg rounded-lg ">
      {/* arrow  */}
      <div
        onClick={() =>
          document
            .querySelector("#card-section")
            .scrollIntoView({ behavior: "smooth", block: "center" })
        }
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white  w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow-md"
      >
        <Image
          src="/images/arrow.svg"
          alt="arrow icon"
          width={20}
          height={24}
          className="text-gray-400"
        />
      </div>

      {/* card content  */}
      <div id="card-section">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
            {/* Removed static text from the header */}
          </h2>
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
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium text-gray-700"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="House">House</option>
                <option value="Plots">Plots</option>
                <option value="Commercial">Commercial</option>
                <option value="Upper Portion">Upper Portion</option>
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
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  id="priceMax"
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  id="areaMax"
                  type="number"
                  value={areaMax}
                  onChange={(e) => setAreaMax(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-50">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
}
