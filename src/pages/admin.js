import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyForm from "@/components/adminComponents/PropertyForm"; // Adjust the path as necessary
import PropertyTable from "@/components/adminComponents/PropertyTable"; // Adjust the path as necessary

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    property_type: "",
    price: "",
    location_id: "",
    latitude: "", // Add latitude to the form data
    longitude: "", // Add longitude to the form data
  });
  const [editingProperty, setEditingProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null); // For storing the selected image
  const [imageBase64, setImageBase64] = useState(null); // For storing the base64 image data

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties", {
        params: { page: 1, resultsPerPage: 10 },
      });
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to convert image to base64 string
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      convertToBase64(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("property_type", formData.property_type);
    form.append("price", formData.price);
    form.append("location_id", formData.location_id);
    form.append("latitude", formData.latitude); // Append latitude
    form.append("longitude", formData.longitude); // Append longitude

    if (imageBase64) {
      form.append("image", imageBase64);
    }

    try {
      if (editingProperty) {
        await axios.put(
          `/api/properties?id=${editingProperty.property_id}`,
          form
        );
      } else {
        await axios.post("/api/properties", form);
      }
      fetchProperties();
      setFormData({
        property_type: "",
        price: "",
        location_id: "",
        latitude: "",
        longitude: "",
      });
      setImage(null);
      setImageBase64(null);
      setEditingProperty(null);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/properties?id=${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData(property);
    setImageBase64(property.image);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Admin Panel
      </h1>

      {/* Property Form */}
      <PropertyForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editingProperty={editingProperty}
        handleImageChange={handleImageChange}
      />

      {/* Property Table */}
      <PropertyTable
        properties={properties}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPage;
