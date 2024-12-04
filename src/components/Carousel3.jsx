"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AutoCarousel3() {
  const [isHovered, setIsHovered] = useState(false);
  const slides = [
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-3.png", expert: "SARAH JONES" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-3.png", expert: "SARAH JONES" },
    { image: "/images/Image-6.png", expert: "BOB MARTIN" },
    { image: "/images/Image-4.png", expert: "JANE DOE" },
    { image: "/images/Image-5.png", expert: "ALICE WILLIAMS" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
    { image: "/images/Image-6.png", expert: "BOB MARTIN" },
    { image: "/images/Image-4.png", expert: "PAIGE SCHULTE" },
    { image: "/images/Image-2.png", expert: "JOHN SMITH" },
  ];

  return (
    <div className="w-full  mx-auto px-4">
      {/* text and button  */}
      <div className="flex justify-between items-center mt-20 mb-5 ">
        <h1
          className="text-2xl tracking-tight text-gray-900"
          // style={{ fontFamily: "Trirong, sans-serif" }}
        >
          Investment Opportunities
        </h1>
        <button className="flex items-center text-white hover:bg-slate-600 transition group py-2 px-4 box-border rounded-full bg-black">
          See All
          <span className="ml-2 transform transition-transform group-hover:translate-x-1 ">
            <Image
              src="/images/right-arrow.svg"
              alt="see more icon"
              width={10}
              height={2}
              className="text-gray-400"
            />
          </span>
        </button>
      </div>

      {/* carousel  */}
      <div
        className="relative overflow-hidden w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex items-center w-[calc(400px*18)] "
          style={{
            animation: "scroll 60s linear infinite",
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] px-2 relative rounded-2xl overflow-hidden"
            >
              <div className="transition-transform duration-300 hover:scale-105 hover:rounded-lg w-full h-full">
                <Image
                  src={slide.image}
                  alt={`Real estate specialist ${slide.expert}`}
                  layout="responsive"
                  width={400}
                  height={400}
                  className="object-cover rounded-2xl"
                />
              </div>

              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wide">
                {slide.expert}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient shadows */}
        {/* <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" /> */}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
