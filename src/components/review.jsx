"use client";

import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ReviewCard = ({ content, author, location, index }) => (
  <motion.div
    className="flex flex-col mb-5 w-full sm:w-[350px]"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2 + index * 0.1, // Stagger the animations
    }}
  >
    <motion.div
      className="h-auto min-h-[160px] flex items-start p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <p className="font-semibold text-sm leading-6 text-gray-700 dark:text-gray-300">
        {content}
      </p>
    </motion.div>
    <motion.div
      className="flex items-start gap-5 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    >
      <div className="flex flex-col justify-center items-start">
        <p className="font-bold text-sm leading-7 text-gray-900 dark:text-white capitalize">
          {author}
        </p>
        <p className="font-semibold text-xs text-gray-500 dark:text-gray-400">
          {location}
        </p>
      </div>
    </motion.div>
  </motion.div>
);

export default function ReviewSection() {
  const { theme, setTheme } = useTheme();

  const reviews = [
    {
      content:
        "Thank you very much for the house found. This is an ideal option for our family at the location and price. The company employs real professionals who will always go the extra mile.",
      author: "Herbert Lindsey",
      location: "New York, USA",
    },
    {
      content:
        'A gentleman from New York discovered what he calls an "oversight" on the part of 99.9% of all marketers that allows him to get otherwise paid-for advertising at Google as well as all other search engines.',
      author: "Noah Russell",
      location: "New York, USA",
    },
    {
      content:
        "For many of us, our very first experience of learning about the celestial bodies begins when we saw our first full moon in the sky. It is truly a magnificent view even to this day.",
      author: "Nellie Griffith",
      location: "New York, USA",
    },
  ];

  const quoteVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative p-4 mb-4">
      <motion.div
        className="relative justify-center items-center"
        initial="hidden"
        animate="visible"
        variants={quoteVariants}
      >
        <p className="font-medium text-base text-center mt-20 text-gray-800 dark:text-gray-200">
          &quot;A well-designed real estate website can be the bridge
          <br className="hidden sm:inline" /> that connects buyers to their
          dream homes,
          <br className="hidden sm:inline" /> and sellers to the right
          buyers.&quot;
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center mt-16 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
