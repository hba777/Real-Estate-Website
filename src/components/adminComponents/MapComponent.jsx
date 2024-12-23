// components/MapComponent.js

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  setFormData,
}) => {
  // Define a custom marker icon
  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41], // Size of the icon (width, height)
    iconAnchor: [12, 41], // The point of the icon that will correspond to the marker's position
    popupAnchor: [1, -34], // The point from which the popup will open relative to the marker
    tooltipAnchor: [16, -28], // The point from which the tooltip will open relative to the marker
  });

  // Handle map click event to get latitude and longitude
  function LocationMarker() {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setLatitude(lat);
        setLongitude(lng);
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
      },
    });

    return (
      latitude &&
      longitude && (
        <Marker position={{ lat: latitude, lng: longitude }} icon={DefaultIcon}>
          <Popup>
            Latitude: {latitude}, Longitude: {longitude}
          </Popup>
        </Marker>
      )
    );
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;
