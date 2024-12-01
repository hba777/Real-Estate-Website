// src/components/WhatsappButton.js

const WhatsAppButton = () => {
  return (
    <a
      href="https://web.whatsapp.com/" // Default WhatsApp Web link
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition whitespace-nowrap" // Added `whitespace-nowrap`
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // WhatsApp logo URL
        alt="WhatsApp"
        className="w-5 h-5 mr-2 shrink-0" // Ensure icon size doesn't shrink
      />
      Contact Us
    </a>
  );
};

export default WhatsAppButton;
