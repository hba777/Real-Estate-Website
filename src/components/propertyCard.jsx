import Image from "next/image";
import { Home, MapPin, Ruler } from "lucide-react";

export default function PropertyCard({
  images = [], // Array of images (base64 or URLs)
  price,
  address,
  bedrooms,
  baths,
  area,
}) {
  return (
    <div className="max-w-md mx-auto overflow-hidden shadow-lg rounded-lg border border-gray-200">
      {/* Image Section */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {images.length > 0 ? (
          <Image
            src={`data:image/jpeg;base64,${images[0]}`} // Adjust to your image type
            alt="Property image"
            width={600}
            height={400}
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Placeholder image"
            width={600}
            height={400}
            className="object-cover"
          />
        )}
        <div className="absolute top-4 left-4 bg-white/90 text-primary px-2 py-1 text-sm font-semibold">
          For Sale
        </div>
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
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{area} sq ft</span>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="px-6 pb-6 pt-0 bg-gray-50">
        <p className="text-sm text-gray-500">
          Beautiful modern home with an open floor plan, updated kitchen, and
          spacious backyard.
        </p>
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
