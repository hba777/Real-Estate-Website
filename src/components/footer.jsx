import React from "react";
import Image from "next/image";
import Link from "next/link";
import starIcon from "../assets/icons/starIcon.png";
import rightArrowIcon from "../assets/icons/rightArrowIcon.png";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa"; // Import social media icons

const Footer = () => {
  return (
    <div className="relative p-4 mb-4 mx-[10px] border-t-2 border-solid border-[#EDEFF2]">
      {/* Row 1: Social Links */}
      <div className="flex flex-col items-center py-5">
        <div className="flex gap-5">
          <Link
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-200"
          >
            <FaLinkedin className="text-xl" />
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-200"
          >
            <FaFacebook className="text-xl" />
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-200"
          >
            <FaInstagram className="text-xl" />
          </Link>
        </div>
      </div>

      {/* Row 2: Main Navigation */}
      <div className="flex justify-center py-2">
        <ul className="flex gap-10">
          <li>
            <Link href="/" className="py-2 hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="py-2 hover:text-orange-500">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/" className="py-2 hover:text-orange-500">
              Services
            </Link>
          </li>
          <li>
            <Link href="/" className="py-2 hover:text-orange-500">
              About
            </Link>
          </li>
          <li>
            <Link href="/" className="py-2 hover:text-orange-500">
              Deals
            </Link>
          </li>
          <li>
            <Link href="/" className="py-2 hover:text-orange-500">
              Contacts
            </Link>
          </li>
        </ul>
      </div>

      {/* Row 3: Secondary Navigation */}
      <div className="flex justify-center py-2 mb-4">
        <div className="flex items-center gap-5 text-xs">
          <Link href="#" className="hover:text-orange-500">
            TERMS
          </Link>
          <div className="border-l border-gray-300 h-4" />
          <Link href="#" className="hover:text-orange-500">
            PRIVACY
          </Link>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="py-4 px-4 w-full bg-blue-500 text-white flex items-center justify-between">
        <p className="capitalize text-[10px] sm:text-[13px] font-semibold leading-[25px] text-center text-bluePText dark:text-white">
          © 2023 Company. All Rights Reserved.
        </p>
        <Link
          href="https://www.figma.com/community/file/1216698613875563555/Company-One"
          target="_blank"
          className="capitalize text-[10px] sm:text-[13px] font-semibold leading-[25px] text-center text-bluePText hover:text-orange-500 dark:text-white"
        >
          Design by Spline One
        </Link>
      </div>
    </div>
  );
};

export default Footer;
