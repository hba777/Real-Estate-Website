import React from "react";
import PropertyImage from "./PropertyImage";

const PropertyRow = ({ property, handleEdit, handleDelete }) => {
  return (
    <tr key={property.property_id} className="hover:bg-gray-100 transition">
      <td className="p-3 border-b">{property.property_id}</td>
      <td className="p-3 border-b">{property.property_type}</td>
      <td className="p-3 border-b">{property.price}</td>
      <td className="p-3 border-b">
        <PropertyImage imageBase64={property.images && property.images[0]} />
      </td>
      <td className="p-3 border-b">{property.location_id}</td>
      <td className="p-3 border-b space-x-2">
        <button
          onClick={() => handleEdit(property)}
          className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(property.property_id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PropertyRow;
