import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContent = ({ property }) => {
  useEffect(() => {
    let map;

    if (property.latitude && property.longitude) {
      const mapContainer = document.getElementById("map-content-inner");
      if (mapContainer && !mapContainer._leaflet_id) {
        // Fix marker icon issue
        const DefaultIcon = L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
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

export default MapContent;
