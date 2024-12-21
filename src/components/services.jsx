import React from "react";

const Services = () => {
  return (
    <section id="services" className="relative p-8 bg-white">
      <div className="relative mt-16">
        <div className="flex flex-col justify-center items-center">
          <p
            style={{ fontFamily: "Trirong, sans-serif" }}
            className="text-7xl sm:text-9xl text-gray-200 font-extrabold text-center absolute top-0 left-0 w-full uppercase"
          >
            Services
          </p>
          <p className="text-3xl sm:text-4xl text-black font-bold text-center relative mt-10">
            Services for Maximum Efficiency
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="text-center mt-16">
        <p className="font-medium text-lg text-gray-700">
          We have developed a unique space where you can work and create. We
          thought of everything to the smallest detail. You will be able to
          conduct your business, host meetings, and collaborate seamlessly.
        </p>
      </div>

      {/* Service List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
        {[
          {
            name: "House",
            description:
              "Comfortable and spacious homes for you and your family.",
          },
          {
            name: "Apartment",
            description: "Modern apartments designed for urban living.",
          },
          {
            name: "Land",
            description:
              "Build your dream home on perfectly located residential plots.",
          },
        ].map((service, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
            <p className="mt-4 text-gray-600 text-sm text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
