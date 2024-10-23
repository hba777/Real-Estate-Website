// src/components/Card.js

import React from "react";

const Card = ({title , price, address, bedrooms,baths, area, imageSrc, }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover relative" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-black">{area}</h3>
        <p className="text-gray-700">{area}</p>
        <p className="text-green-300">{bedrooms}</p>
      </div>
    </div>
  );
};

export default Card;
