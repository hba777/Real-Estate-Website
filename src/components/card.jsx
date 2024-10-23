// src/components/Card.js

import React from "react";

const Card = ({ imageSrc, title, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-700">{price}</p>
      </div>
    </div>
  );
};

export default Card;
