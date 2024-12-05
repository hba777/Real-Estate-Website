import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


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
        className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition duration-200"
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

const MapContent = ({ property }) => {
  useEffect(() => {
    let map;

    if (property.latitude && property.longitude) {
      const mapContainer = document.getElementById("map-content-inner");
      if (mapContainer && !mapContainer._leaflet_id) {
        // Fix marker icon issue
        const DefaultIcon = L.icon({
          iconUrl: "/images/marker-icon.png",
          shadowUrl: "/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
        });

        L.Marker.prototype.options.icon = DefaultIcon;

        map = L.map(mapContainer).setView(
          [property.latitude, property.longitude],
          14
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        L.marker([property.latitude, property.longitude])
          .addTo(map)
          .bindPopup(property.locality || "Unknown Location")
          .openPopup();
      }
    }

    return () => {
      if (map) map.remove();
    };
  }, [property]);

  return (
    <div id="map-content-inner" className="w-full h-full rounded-lg"></div>
  );
};

export default PropertyMapButton;
