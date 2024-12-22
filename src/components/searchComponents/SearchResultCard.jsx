import React from "react";
import Image from "next/image";
import { Camera, Bed, Bath, Ruler } from "lucide-react";

function SearchResultCard({
  price,
  address,
  bedrooms,
  baths,
  area,
  images,
  onClick,
}) {
  const formatPrice = (price) => {
    if (!price) return "";

    const numberPrice = typeof price === "string" ? parseFloat(price) : price;

    if (isNaN(numberPrice)) return "";

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
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer w-64 h-64 flex flex-col overflow-hidden"
    >
      <div className="relative w-full h-1/2">
        {images.length > 0 ? (
          <Image
            src={`data:image/jpeg;base64,${images[0]}`}
            alt="Property image"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image Available</span>
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Camera className="w-3 h-3" />
            <span>{images.length}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between h-1/2">
        <div>
          <p className="text-gray-700 font-bold text-lg mb-1">
            {formatPrice(price)}
          </p>
          <p className="text-gray-600 text-sm line-clamp-2">{address}</p>
        </div>
        <div className="flex justify-between mt-2 text-gray-500 text-xs">
          <div className="flex items-center">
            <Bed className="w-3 h-3 mr-1" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-3 h-3 mr-1" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center">
            <Ruler className="w-3 h-3 mr-1" />
            <span>{area}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
