import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { FaCamera, FaBed, FaBath, FaRulerVertical } from "react-icons/fa";

const SearchResultCard = ({
  title,
  price,
  address,
  bedrooms,
  baths,
  area,
  images,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
  >
    <div className="relative w-48 h-48 flex-shrink-0">
      {images.length > 0 ? (
        <Image
          src={`data:image/jpeg;base64,${images[0]}`}
          alt={`Property image`}
          className="w-full h-full object-cover rounded-lg"
          width={192}
          height={192}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
          <FaCamera />
          <span>{images.length}</span>
        </div>
      )}
    </div>
    <div className="ml-4 flex flex-col justify-between">
      <h2 className="text-lg font-semibold truncate">{title}</h2>
      <p className="text-gray-700 font-bold">Price: {formatPrice(price)}</p>
      <p className="text-gray-700">
        <span className="font-bold">Address:</span> {address}
      </p>
      <div className="flex justify-around mt-4 space-x-4 sm:space-x-8 text-center">
        {/* Bedrooms */}
        <div className="flex flex-col items-center">
          <FaBed className="text-xl text-gray-500" />
          <span className="mt-2 text-sm text-gray-700">{bedrooms}</span>
        </div>

        {/* Bathrooms */}
        <div className="flex flex-col items-center">
          <FaBath className="text-xl text-gray-500" />
          <span className="mt-2 text-sm text-gray-700">{baths}</span>
        </div>

        {/* Area */}
        <div className="flex flex-col items-center">
          <FaRulerVertical className="text-xl text-gray-500" />
          <span className="mt-2 text-sm text-gray-700">{area}</span>
        </div>
      </div>
    </div>
  </div>
);

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
    return `₨ ${formatNumber(numberPrice / 1e7)} crore`;
  } else if (numberPrice >= 1e5) {
    return `₨ ${formatNumber(numberPrice / 1e5)} lakh`;
  } else {
    return `₨ ${formatNumber(numberPrice)}`;
  }
}

SearchResultCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  address: PropTypes.string.isRequired,
  bedrooms: PropTypes.number.isRequired,
  baths: PropTypes.number.isRequired,
  area: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchResultCard;
