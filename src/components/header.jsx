import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Home Search", href: "/home-search" },
    { name: "Neighborhoods", href: "/neighborhoods" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-xs font-semibold text-white">
              Neighborhood
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                pathname === item.href
                  ? "bg-black text-white" // Selected item becomes black with white text
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-2 rounded-full text-xs text-white hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-full text-xs bg-white text-black hover:bg-opacity-90 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
