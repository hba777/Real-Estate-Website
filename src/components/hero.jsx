import Image from "next/image";
import React from "react";

const Hero = ({ address, phone, email }) => {
  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        <video
          src="/images/video2.mp4"
          autoPlay
          loop
          muted
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-transparent to-black opacity-60"></div>

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
            <p
              style={{ fontFamily: "Trirong, sans-serif" }}
              className="absolute right-6 top-1/2 -translate-y-1/2 max-w-md p-6 text-lg text-white bg-transparent rounded-tr-2xl before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-t before:border-l before:border-white/30 before:rounded-tl-2xl"
            >
              Welcome to <strong>Lona</strong> your trusted partner in
              navigating real estate across Pierce and Kitsap counties. Our team
              of local specialists is here to provide expert guidance and
              unwavering support, ensuring your transaction is seamless and
              stress-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
