const PropertyDetailsTable = ({ property }) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-full border-t border-gray-300"></div>
        <h2 className="text-lg font-medium mb-2 flex items-center justify-center px-4">
          Details
        </h2>
        <div className="w-full border-t border-gray-300"></div>
      </div>

      <div className="grid grid-cols-1 bg-white p-5 rounded-lg border-gray-400 shadow-md">
        <div className="flex justify-between p-3  bg-gray-100 rounded-md">
          <span className="font-medium">Type</span>
          <span>{property.property_type || "N/A"}</span>
        </div>
        <div className="flex justify-between p-3  ">
          <span className="font-medium">Price</span>
          <span>{formatPrice(property.price)}</span>
        </div>
        <div className="flex justify-between p-3  bg-gray-100 rounded-md">
          <span className="font-medium mr-2">Location</span>
          <span>{property.locality}</span>
        </div>
        <div className="flex justify-between p-3">
          <span className="font-medium">Bath(s)</span>
          <span>{property.baths}</span>
        </div>
        <div className="flex justify-between p-3  bg-gray-100 rounded-md">
          <span className="font-medium">Area</span>
          <span>{property.area} Kanal</span>
        </div>
        <div className="flex justify-between p-3 ">
          <span className="font-medium">Purpose</span>
          <span>{property.purpose || "For Sale"}</span>
        </div>
        <div className="flex justify-between p-2  bg-gray-100 rounded-md">
          <span className="font-medium">Bedroom(s)</span>
          <span>{property.bedrooms}</span>
        </div>
        <div className="flex justify-between p-3">
          <span className="font-medium">Added</span>
          <span>{formatDate(property.date_added) || "N/A"}</span>
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

function formatDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export default PropertyDetailsTable;
