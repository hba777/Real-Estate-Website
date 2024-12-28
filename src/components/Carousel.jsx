"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AutoCarousel3() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const slides = [
    { image: "/images/Image-2.webp" },
    { image: "/images/Image-3.webp" },
    { image: "/images/Image-6.webp" },
    { image: "/images/Image-7.webp" },
    { image: "/images/Image-9.webp" },
  ];

  const handleSeeAllClick = () => {
    router.push("/search");
  };

  return (
    <div className="w-full mx-auto px-4">
      {/* text and button */}
      <div className="flex justify-between items-center mt-20 mb-5">
        <h1
          className="text-2xl tracking-tight text-gray-900 font-semibold"
          style={{ fontFamily: "Trirong, sans-serif" }}
        >
          We Will Find The Best Options
        </h1>
        <button
          onClick={handleSeeAllClick}
          className="flex items-center text-white hover:bg-slate-600 transition group py-2 px-4 box-border rounded-full bg-black"
        >
          See All
          <span className="ml-2 transform transition-transform group-hover:translate-x-1">
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

      {/* carousel */}
      <div
        className="relative overflow-hidden w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex items-center"
          style={{
            animation: "scroll 60s linear infinite",
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {[...slides, ...slides].map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] px-2 relative rounded-2xl overflow-hidden"
            >
              <div className="transition-transform duration-300 hover:scale-105 hover:rounded-lg w-full h-full">
                <Image
                  src={slide.image}
                  alt={`Image ${(index % slides.length) + 1}`}
                  width={400}
                  height={400}
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>
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
