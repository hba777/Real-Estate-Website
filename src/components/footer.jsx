import React from "react";
import { Twitter, Github, Facebook, Linkedin, Instagram } from "lucide-react";

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
  >
    {children}
  </a>
);

const FooterLinkSection = ({ title, links }) => (
  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6">
    <h3 className="text-gray-500 font-semibold text-sm uppercase mb-2">
      {title}
    </h3>
    <ul className="list-none">
      {links.map((link) => (
        <li key={link.href} className="mb-2">
          <FooterLink href={link.href}>{link.label}</FooterLink>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-600 hover:text-gray-800"
  >
    <Icon className="h-6 w-6" />
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  ];

  return (
    <div className="flex flex-col">
      {/* Main content */}
      <footer
        className="bg-gray-100 pt-12 pb-8 mt-auto"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Let&apos;s keep in touch!
              </h2>
              <p className="text-gray-600 mb-4">
                Find us on any of these platforms, we respond within 1-2
                business days.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <SocialIcon key={link.href} {...link} />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-2/3"></div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Salaar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
