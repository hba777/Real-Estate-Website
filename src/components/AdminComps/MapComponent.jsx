import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for proper rendering

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

const MapComponent = ({ latitude, longitude, setLatitude, setLongitude }) => {
  const mapRef = useRef(null); // Reference to map instance
  const mapContainerRef = useRef(null); // Reference to the container div

  useEffect(() => {
    // Check if the map already exists
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map(mapContainerRef.current).setView(
        [latitude, longitude],
        13
      );

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add a draggable marker with the custom icon
      const marker = L.marker([latitude, longitude], {
        draggable: true,
        icon: DefaultIcon,
      }).addTo(mapRef.current);

      // Update the parent component's latitude and longitude when the marker is dragged
      marker.on('dragend', function (e) {
        const { lat, lng } = e.target.getLatLng();
        setLatitude(lat);
        setLongitude(lng);
      });

      // Update the marker when the map is clicked
      mapRef.current.on('click', function (e) {
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);
        marker.setLatLng([lat, lng]);
      });
    } else {
      // Update map center when latitude or longitude changes
      mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
    }
  }, [latitude, longitude, setLatitude, setLongitude]);

  return (
    <div
      className="map-container border rounded-md shadow-lg overflow-hidden"
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '400px',
      }}
    >
      <div
        ref={mapContainerRef}
        id="map"
        style={{
          height: '100%',
          width: '100%',
        }}
      ></div>
    </div>
  );
};

export default MapComponent;
