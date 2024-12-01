import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const SearchResultCard = ({ title, price, address, bedrooms, baths, area, images, onClick }) => (
  <div onClick={onClick} className="border p-4 rounded-lg shadow-md cursor-pointer">
    <h2 className="text-xl font-semibold">{title}</h2>
    <p>Price: {formatPrice(price)}</p>
    <p>Address: {address}</p>
    <p>Bedrooms: {bedrooms}</p>
    <p>Baths: {baths}</p>
    <p>Area: {area} marla</p>
    <div className="image-gallery">
      {images.length > 0 && (
        <Image
          src={`data:image/jpeg;base64,${images[0]}`}
          alt={`Property image 1`}
          className="w-full h-32 object-cover mt-2"
          width={400}
          height={200}
        />
      )}
    </div>
  </div>
);

function formatPrice(price) {
  if (!price) return ''; // Handle empty or undefined price

  const numberPrice = parseFloat(price);

  if (isNaN(numberPrice)) return ''; // Handle invalid price

  // Helper function to format number with two decimal places
  const formatNumber = (num) =>
    num.toLocaleString('en-PK', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  if (numberPrice >= 1e7) { // Greater than or equal to 1 crore
    return `₨ ${formatNumber(numberPrice / 1e7)} crore`;
  } else if (numberPrice >= 1e5) { // Greater than or equal to 1 lakh
    return `₨ ${formatNumber(numberPrice / 1e5)} lakh`;
  } else { // Less than 1 lakh
    return `₨ ${formatNumber(numberPrice)}`;
  }
}


Card.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  address: PropTypes.string.isRequired,
  bedrooms: PropTypes.number.isRequired,
  baths: PropTypes.number.isRequired,
  area: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchResultCard;
