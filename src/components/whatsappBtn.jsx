// src/components/WhatsappButton.js
import Image from "next/image";

export default function WhatsAppButton({ property }) {
  console.log("Property Data Received in WhatsAppButton:", property);
  if (!property) {
    console.error("Property data is missing in WhatsAppButton component");
    return null; // Do not render if property data is unavailable
  }

  const phoneNumber = "+923345098296"; // Correct phone number with country code
  const message = encodeURIComponent(
    `I would like to get more information about the '${
      property.property_type || "N/A"
    }' located in '${property.locality || "N/A"}' with price '${
      property.price || "N/A"
    }'.`
  );

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center bg-black/50 text-white px-2 py-1 rounded hover:bg-green-900 transition whitespace-nowrap"
    >
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        height={192}
        width={192}
        className="w-5 h-5 mr-2 shrink-0"
      />
      Contact Us
    </a>
  );
}
