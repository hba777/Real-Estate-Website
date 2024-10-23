import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

const PropertySearch = () => {
  const [city, setCity] = useState("Islamabad");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("House");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState("");
  const [areaMin, setAreaMin] = useState(0);
  const [areaMax, setAreaMax] = useState("");
  const [bedrooms, setbedrooms] = useState(1);

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build query parameters
    const query = {
      //city,
      location,
      propertyType,
      priceMin,
      priceMax,
      areaMin,
      areaMax,
      bedrooms,
    };

    // Remove empty or default values from the query
    Object.keys(query).forEach((key) => {
      if (query[key] === "" || query[key] === "All" || query[key] === 0) {
        delete query[key];
      }
    });

    // Push to the search route with query parameters
    router.push({
      pathname: "/search",
      query: query,
    });
  };

  return (
    <div className="bg-white p-10 shadow-md rounded-md my-10 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Search properties for sale in Pakistan
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* City Dropdown */}
        <div className="col-span-1">
          <label
            htmlFor="city"
            className="block font-medium mb-1 text-gray-400"
          >
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-50 text-black"
          >
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
          </select>
        </div>

        {/* Location Input */}
        <div className="col-span-1">
          <label
            htmlFor="location"
            className="block font-medium mb-1 text-gray-400"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full p-2 border rounded-md bg-gray-50 text-black"
          />
        </div>

        {/* Property Type Dropdown */}
        <div className="col-span-1">
          <label
            htmlFor="propertyType"
            className="block font-medium mb-1 text-gray-400"
          >
            Property Type
          </label>
          <select
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-50 text-black"
          >
            <option value="House">House</option>
            <option value="Plots">Plots</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Price Input */}
        <div className="col-span-1">
          <label
            htmlFor="price"
            className="block font-medium mb-1 text-gray-400"
          >
            Price (PKR)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="priceMin"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="Min"
              className="w-1/2 p-2 border rounded-md bg-gray-50 text-black"
            />
            <input
              type="number"
              id="priceMax"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="Max"
              className="w-1/2 p-2 border rounded-md bg-gray-50 text-black"
            />
          </div>
        </div>

        {/* Area Input */}
        <div className="col-span-1">
          <label
            htmlFor="area"
            className="block font-medium mb-1 text-gray-400"
          >
            Area (Marla)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="areaMin"
              value={areaMin}
              onChange={(e) => setAreaMin(e.target.value)}
              placeholder="Min"
              className="w-1/2 p-2 border rounded-md bg-gray-50 text-black"
            />
            <input
              type="number"
              id="areaMax"
              value={areaMax}
              onChange={(e) => setAreaMax(e.target.value)}
              placeholder="Max"
              className="w-1/2 p-2 border rounded-md bg-gray-50 text-black"
            />
          </div>
        </div>

        {/* bedrooms Input */}
        <div className="col-span-1">
          <label
            htmlFor="bedrooms"
            className="block font-medium mb-1 text-gray-400"
          >
            bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setbedrooms(e.target.value)}
            placeholder="bedrooms"
            className="w-full p-2 border rounded-md bg-gray-50 text-black"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 flex items-end justify-center">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md"
          >
            Find
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;
