import React from "react";
import PropertyRow from "./PropertyRow";

const PropertyTable = ({ properties, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Type</th>
            <th className="p-3 border-b">Price</th>
            <th className="p-3 border-b">Image</th>
            <th className="p-3 border-b">Location</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <PropertyRow
              key={property.property_id}
              property={property}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
