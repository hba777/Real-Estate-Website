import React, { useState, useEffect, useRef } from "react";
import Hero from "@/components/hero";
import PropertySearch from "@/components/searchComponents/PropertySearchForm";
import AutoCarousel from "@/components/Carousel";
import ContactUs from "@/components/contactUs";
import ReviewSection from "@/components/review";
import Services from "@/components/services";
import ContactForm from "@/components/contactForm";

const HomePage = () => {
  const [showButton, setShowButton] = useState(false);

  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  // Function to add elements to the ref
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
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

    // Intersection Observer for triggering scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "transform-none"); // Trigger animation
          } else {
            entry.target.classList.remove("opacity-100", "transform-none");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    sectionRefs.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionRefs.current.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Hero />
      <div
        ref={addToRefs}
        className="fade-in opacity-0 transform translate-y-10 transition-all duration-700 ease-out"
      >
        <PropertySearch />
      </div>
      <div
        ref={addToRefs}
        className="fade-in opacity-0 transform translate-x-10 transition-all duration-700 ease-out"
      >
        <AutoCarousel />
      </div>
      <div
        ref={addToRefs}
        className="fade-in opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <ContactUs />
      </div>

      <div
        ref={addToRefs}
        className="fade-in opacity-0 transform translate-x-10 transition-all duration-700 ease-out"
      >
        <ReviewSection/>
      </div>
      <div
        ref={addToRefs}
        className="fade-in opacity-0 transform translate-x-10 transition-all duration-700 ease-out"
      >
        <Services/>
      </div>
      <div
        ref={addToRefs}
        id="contact-form"
        className="fade-in opacity-0 transform translate-x-10 transition-all duration-700 ease-out"
      >
        <ContactForm />
      </div>
    </>
  );
};

export default HomePage;
