"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={`w-full bg-sky-500 py-4`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="/" className="text-white font-semibold">
              Home
            </Link>
            <Link href="/library" className="text-white font-semibold">
              Library
            </Link>
          </div>
          <div>
            <Link href="/library" className="text-white font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-6 bg-gradient-to-b from-sky-500 to-transparent ${
          isScrolled ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      ></div>
    </div>
  );
};
