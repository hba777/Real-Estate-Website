import React, { useState, useEffect } from "react";

import Hero from "@/components/hero";
import PropertySearch from "@/components/PropertySearchCard";
import Carousel from "@/components/carousel";
import ContactUs from "@/components/contactUs";
import Footer from "@/components/footer";

import { app, analytics } from "../utils/firebase";

const HomePage = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: (0, 0), behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Hero />
      <PropertySearch />
      <Carousel />
      <ContactUs />
      <Footer />
    </>
  );
};

export default HomePage;
