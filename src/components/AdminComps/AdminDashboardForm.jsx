import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function AdminDashboardForm() {
  const [formData, setFormData] = useState({
    area: '10 Marla',
    area_marla: 10,
    baths: '3',
    bedrooms: '3',
    city: 'Rawalpindi',
    date_added: '2019-06-20T19:00:00.000Z',
    images: [],
    latitude: 33.547162288216,
    longitude: 73.131689429283,
    price: '33000',
    property_id: '919906',
    property_type: 'Upper Portion',
    province_name: 'Punjab',
    locality: 'Bahria Town Rawalpindi, Rawalpindi, Punjab',
    location_id: '3041',
  });

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
    
    console.log('Form Data Submitted:', formData);
  
    try {
      const response = await fetch('/api/addproperty', {
        method: 'POST', // or 'PUT' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as a JSON string
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Handle successful response
        // You can update the UI here (e.g., show a success message or reset the form)
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData); // Handle error response
        // You can display error messages here
      }
    } catch (error) {
      console.error('Error calling API:', error); // Handle network or unexpected errors
      // You can display a generic error message here
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Property Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.keys(formData).map((key) => {
            if (key === 'images') {
              return null; // Images handled separately
            }
            return (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium capitalize">
                  {key.replace('_', ' ')}
                </label>
                <input
                  type={key === 'area_marla' || key === 'baths' || key === 'bedrooms' || key === 'price' ? 'number' : 'text'}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            );
          })}
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium">
            Choose Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Display Uploaded Images */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {formData.images.map((image, index) => (
            <div
              key={index}
              className="border rounded-md overflow-hidden shadow-md bg-white"
            >
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <div className="p-2 text-center text-sm">Image {index + 1}</div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="map" className="block text-sm font-medium">
            Set Location on Map
          </label>
          <MapComponent
            latitude={formData.latitude}
            longitude={formData.longitude}
            setLatitude={(lat) => setFormData((prevData) => ({ ...prevData, latitude: lat }))}
            setLongitude={(lon) => setFormData((prevData) => ({ ...prevData, longitude: lon }))}
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
