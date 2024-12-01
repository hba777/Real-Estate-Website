import Image from "next/image";
import React from "react";

const Hero = ({ address, phone, email }) => {
  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/heroBackground.png"
          alt="Background image"
          fill
          className="w-full h-screen bg-no-repeat object-cover object-center"
          priority // Optional: Ensures the image loads quickly
        />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
          <div className="space-y-0">
            <h2
              className="text-1xl font-medium text-white italic"
              style={{ fontFamily: "Trirong, sans-serif" }}
            >
              Local Experts
            </h2>
            <h1
              className="text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "Trirong, sans-serif" }}
            >
              LOCAL
              <br />
              SPECIALISTS
            </h1>
          </div>

          <div className="lg:max-w-xl relative">
            <div className="absolute inset-0 bg-white opacity-10 rounded-tl-3xl rounded-bl-3xl"></div>
            <p className="absolute right-6 top-1/2 -translate-y-1/2 max-w-md p-6 text-lg text-white bg-transparent rounded-tr-2xl before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-t before:border-l before:border-white/30 before:rounded-tl-2xl">
              When it comes to real estate in Pierce &amp; Kitsap counties,
              trust us to guide you through every step. We&#39;ve got the
              expertise and dedication you need for a smooth transaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
