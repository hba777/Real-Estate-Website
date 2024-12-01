const PropertyDetailsTable = ({ property }) => {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
          {/* Left Column */}
          <div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Type</span>
              <span>{property.property_type || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Price</span>
              <span>{formatPrice(property.price)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Location</span>
              <span>{property.locality}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Bath(s)</span>
              <span>{property.baths}</span>
            </div>
          </div>
  
          {/* Right Column */}
          <div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Area</span>
              <span>{property.area} Kanal</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Purpose</span>
              <span>{property.purpose || "For Sale"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Bedroom(s)</span>
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Added</span>
              <span>{formatDate(property.date_added) || "N/A"}</span>
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

  function formatDate(dateString) {
    if (!dateString) return "N/A";
  
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  export default PropertyDetailsTable;
  