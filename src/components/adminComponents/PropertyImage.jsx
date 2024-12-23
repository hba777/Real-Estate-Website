import React from "react";
import Image from "next/image";

const PropertyImage = ({ imageBase64 }) => {
  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      {imageBase64 ? (
        <Image
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt="Property image"
          width={100} // Adjust width and height as needed
          height={100}
          objectFit="cover"
        />
      ) : (
        <span className="text-gray-500 text-sm">No Image Available</span>
      )}
    </div>
  );
};

export default PropertyImage;
