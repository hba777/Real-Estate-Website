import Image from "next/image";
import Link from "next/link";

export default function TestimonialSection() {
  return (
    <section className="relative min-h-[400px] w-full overflow-hidden mt-20">
      {/* Background Image */}
      <Image
        src="/images/Image-4.webp"
        layout="fill"
        objectFit="cover"
        quality={85}
        priority
        className="absolute inset-0"
        alt="Scenic view background image"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Text Content and Button (on the left for large screens) */}
          <div className="lg:w-1/2 space-y-8">
            <h2
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "Trirong, sans-serif" }}
            >
              Positive stories
              <br />
              of our clients
            </h2>
            <Link href="/contact" className="inline-block">
              <button className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                Ask us a question →
              </button>
            </Link>
          </div>

          {/* Testimonial Card (on the right for large screens) */}
          <div className="lg:w-1/2">
            <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-md backdrop-blur-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Sarah K.</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  &quot;Our stay at the panoramic wonder cabin was magical. The
                  unique design and serene surroundings captivated us from the
                  moment we arrived. The cabin blends modern architecture with
                  natural wood elements perfectly. The highlight was definitely
                  the glass ceiling, offering breathtaking forest views. We
                  spent our days hiking nearby trails and our evenings
                  stargazing by the fireplace. I can&apos;t imagine a more
                  perfect escape from the city.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
