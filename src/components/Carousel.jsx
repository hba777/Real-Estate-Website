"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";

export default function AutoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/Image-8.png",
      expert: "PAIGE SCHULTE",
    },
    {
      image: "/images/Image-2.png",
      expert: "JOHN SMITH",
    },
    {
      image: "/images/Image-3.png",
      expert: "SARAH JONES",
    },
    {
      image: "/images/Image-4.png",
      expert: "JANE DOE",
    },
    {
      image: "/images/Image-5.png",
      expert: "ALICE WILLIAMS",
    },
    {
      image: "/images/Image-6.png",
      expert: "BOB MARTIN",
    },
  ];

  const imagesPerSlide = 3; // Number of images to show at a time

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % (slides.length - imagesPerSlide + 1)
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % (slides.length - imagesPerSlide + 1)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + (slides.length - imagesPerSlide + 1)) %
        (slides.length - imagesPerSlide + 1)
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="space-y-2 mb-8">
        <div
          className="text-sm text-blue-600"
          style={{ fontFamily: "Trirong, sans-serif" }}
        >
          Local Experts
        </div>
        <h1
          className="text-4xl font-bold tracking-tight text-gray-900"
          style={{ fontFamily: "Trirong, sans-serif" }}
        >
          Discover Your Local Real
          <br />
          Estate Specialist
        </h1>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentSlide * (100 / imagesPerSlide)
              }%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-1/3 flex-shrink-0 px-2">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-blue-100 to-blue-50 group">
                  <Image
                    src={slide.image}
                    alt={`Real estate specialist ${slide.expert}`}
                    layout="responsive"
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wide">
                    {slide.expert}
                  </div>
                  {slide.hasAction && (
                    <button className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition-colors">
                      <MoveRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-6 bottom-6 flex gap-2">
          <button
            onClick={prevSlide}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
}
