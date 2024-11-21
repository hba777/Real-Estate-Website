// src/components/Card.js

import React from "react";

const Card = ({ title, price, address, bedrooms, baths, area, imageSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-40 object-cover relative"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-black">Area: {area}</h3>
        <p className="text-red-300">Price: {formatPrice(price)}</p>
        <p className="text-green-300">Bedrooms: {bedrooms}</p>
        <p className="text-orange-300">{address}</p>
      </div>
    </div>
  );
};

function formatPrice(price) {
  if (!price) return ""; // Handle empty or undefined price

  const numberPrice = parseFloat(price);

  if (isNaN(numberPrice)) return ""; // Handle invalid price

  // Helper function to format number with two decimal places
  const formatNumber = (num) =>
    num.toLocaleString("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  if (numberPrice >= 1e7) {
    // Greater than or equal to 1 crore
    return `₨${formatNumber(numberPrice / 1e7)} crore`;
  } else if (numberPrice >= 1e5) {
    // Greater than or equal to 1 lakh
    return `₨${formatNumber(numberPrice / 1e5)} lakh`;
  } else {
    // Less than 1 lakh
    return "₨" + formatNumber(numberPrice);
  }
}

export default Card;
