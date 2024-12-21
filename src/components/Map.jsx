import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import dynamic from "next/dynamic";

// Dynamically import the MapContent component to disable server-side rendering
const MapContent = dynamic(() => import("./mapContent"), { ssr: false });

const PropertyMapButton = ({ property }) => {
  const [isMapVisible, setMapVisible] = useState(false);

  const showLargeMap = () => {
    if (property.latitude && property.longitude) {
      setMapVisible(true);
    } else {
      console.error(
        "Latitude or longitude is missing for the property:",
        property
      );
    }
  };

  const hideLargeMap = () => {
    setMapVisible(false);
  };

  return (
    <div>
      {/* Map Button */}
      <button
        onClick={showLargeMap}
        className="flex items-center px-4 py-2 bg-white text-gray-700 border border-black rounded-md shadow-md hover:bg-gray-400 transition duration-200"
      >
        <FaMapMarkerAlt className="mr-2" />
        Map
      </button>

      {/* Large Map */}
      {isMapVisible && (
        <div
          id="large-map"
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={hideLargeMap}
        >
          <div
            id="map-content"
            className="w-11/12 h-4/5 bg-white rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <MapContent property={property} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMapButton;
