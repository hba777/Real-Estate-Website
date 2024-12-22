import { useState, useEffect, useRef } from "react";
import PropertySearchForm from "@/components/searchComponents/PropertySearchForm";
import PropertySearchList from "@/components/propertySearchList";

const SearchPage = () => {
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
      {/* dark:bg-bgDark for dark mode */}
      <div className="flex flex-col px-4 py-6 bg-[#fafafa]">
        <div>
          <div
            ref={addToRefs}
            className="fade-in opacity-0 transform translate-y-10 transition-all duration-700 ease-out"
          >
            <div className="mt-16">
              <h1
                className="text-3xl font-bold text-black leading-tight text-center"
                style={{ fontFamily: "Trirong, sans-serif" }}
              >
                Discover Your Dream Home
              </h1>
              <h2
                className="text-lg font-medium text-black italic text-center mt-2"
                style={{ fontFamily: "Trirong, sans-serif" }}
              >
                Where Elegance Meets Comfort
              </h2>
            </div>
          </div>

          <div className="mt-8">
            <PropertySearchForm />
          </div>
        </div>

        <div
          ref={addToRefs}
          className="fade-in opacity-0 translate-y-10 transition-all duration-700 ease-out"
        >
          <div className="mt-12">
            <PropertySearchList />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
