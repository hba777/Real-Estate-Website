import Image from "next/image";
import { Home, MapPin, Ruler } from "lucide-react";
import PropertyMapButton from "./Map";
import BookmarkButton from "../bookmarkButton";
import WhatsAppButton from "../whatsappBtn";
import { useEffect, useState } from "react";

export default function PropertyCard({
  images = [], // Array of images (base64 or URLs)
  price,
  address,
  bedrooms,
  baths,
  area,
}) {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Retrieve the property from session storage
    const storedProperty = sessionStorage.getItem("selectedProperty");
    if (storedProperty) {
      setProperty(JSON.parse(storedProperty));
    }
  }, []);

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" mx-auto overflow-hidden ">
      {/* Image Section */}
      <div className="relative overflow-hidden px-6">
        {images.length > 0 ? (
          <Image
            src={`data:image/jpeg;base64,${images[0]}`} // Adjust to your image type
            alt="Property image"
            className="object-cover hover:scale-105 transition-transform duration-300"
            width={600}
            height={600}
          />
        ) : (
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Placeholder image"
            className="object-cover"
            width={500}
            height={500}
          />
        )}
        {/* Buttons on top of the image */}
        <div className="absolute bottom-10 left-0 right-0 px-4 flex flex-row md:flex-row items-center justify-center gap-3">
          <PropertyMapButton property={property} />
          <BookmarkButton property={property} />
          <WhatsAppButton property={property} />
        </div>
        {/* <div className="absolute top-4 left-6 text-primary px-2 py-1 text-sm font-semibold">
          <p className="text-gray-200">For Sale</p>
        </div> */}
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-2">
              {address}
            </h3>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{address}</span>
            </div>
          </div>
          <p className="text-xl font-bold text-primary">{formatPrice(price)}</p>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-2 gap-4 mt-6 bg-black p-3 text-gray-200">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 " />
            <span className="text-sm">{bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4" />
            <span className="text-sm">{area} sq ft</span>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="px-6 pb-6 pt-0 ">
        <p className="text-base text-gray-600 font-semibold mb-2">
          Description
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Beautiful modern home with an open floor plan, updated kitchen, and
          spacious backyard.
        </p>
        {/* Divider Line */}
        <div className="w-full border-t border-gray-300"></div>
      </div>
    </div>
  );
}

// Price formatting function
function formatPrice(price) {
  if (!price) return ""; // Handle empty or undefined price

  const numberPrice = parseFloat(price);

  if (isNaN(numberPrice)) return ""; // Handle invalid price

  // Helper function to format the number
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
    return "₨ " + formatNumber(numberPrice);
  }
}
