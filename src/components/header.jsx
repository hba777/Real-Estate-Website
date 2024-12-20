import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 font-sans ">
      <div className="w-full">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center px-4 space-x-2 pr-12">
            <svg
              className="h-6 w-6 "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            <span className="text-xl ">LONA</span>{" "}
            {/* Removed font-semibold to remove bold */}
          </div>

          <div className="hidden md:flex items-center space-x-0 bg-white border-2 border-gray-200 rounded-md">
            <Link
              href="/"
              className="text-sm text-black bg-white px-4 py-2 rounded-l-md hover:bg-gray-200 transition-colors"
            >
              Home
            </Link>
            <Link
              href=""
              className="text-sm text-black bg-white px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              Next
            </Link>
            <Link
              href=""
              className="text-sm text-black bg-white px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              Services
            </Link>
            <Link
              href=""
              className="text-sm text-black bg-white px-4 py-2 rounded-r-md hover:bg-gray-200 transition-colors"
            >
              News
            </Link>
          </div>

          <div className="flex items-center space-x-4 px-6">
            <button className="px-2 py-2 text-sm text-white bg-black border border-transparent rounded-md hover:bg-white hover:text-black transition-colors">
              Contact Us
            </button>
            <button className="p-2 rounded-full bg-white">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
