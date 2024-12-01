import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBed,
  FaBath,
  FaRulerVertical,
} from "react-icons/fa6";

const PropertyCard = ({ images, price, address, bedrooms, baths, area }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex flex-col items-center p-6 border rounded-lg shadow-lg w-full max-w-[800px] mx-auto bg-white">
      <h2 className="text-black">{address}</h2>
      {/* Image Carousel */}
      <div className="relative w-full">
        <button
          onClick={handlePrevClick}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 p-3 rounded-full z-10"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 p-3 rounded-full z-10"
        >
          <FaArrowRight />
        </button>

        {images.length > 0 && (
          <img
            src={`data:image/jpeg;base64,${images[currentIndex]}`}
            alt={`Property image ${currentIndex + 1}`}
            className="w-full h-[500px] object-cover rounded-lg"
          />
        )}
      </div>

      {/* Property Details */}
      <div className="flex flex-col w-full mt-4 text-left">
        <h2 className="text-xl font-bold">{address}</h2>
        <p className="text-lg text-gray-600">{formatPrice(price)}</p>

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
    return `₨ ${formatNumber(numberPrice / 1e7)} crore`;
  } else if (numberPrice >= 1e5) {
    // Greater than or equal to 1 lakh
    return `₨ ${formatNumber(numberPrice / 1e5)} lakh`;
  } else {
    // Less than 1 lakh
    return "₨ " + formatNumber(numberPrice);
  }
}

export default PropertyCard;
