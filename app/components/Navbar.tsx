"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      {/* BRAND */}
      <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">
        MANGO MULTIMEDIA
      </h1>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-8 text-sm font-medium text-white">
        {["About", "Work", "Brands", "Contact"].map((label, i) => (
          <button
            key={i}
            onClick={() =>
              scrollTo(
                label === "About"
                  ? "about-section"
                  : label === "Work"
                  ? "work-section"
                  : label === "Brands"
                  ? "brands-section"
                  : "contact-section"
              )
            }
            className="hover:text-gray-300 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      {/* MOBILE HAMBURGER */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md text-white py-8 px-6 flex flex-col gap-6 text-lg md:hidden">
          {["About", "Work", "Brands", "Contact"].map((label, i) => (
            <button
              key={i}
              onClick={() =>
                clickAndClose(
                  label === "About"
                    ? "about-section"
                    : label === "Work"
                    ? "work-section"
                    : label === "Brands"
                    ? "brands-section"
                    : "contact-section",
                  setMenuOpen
                )
              }
              className="text-left font-medium hover:text-gray-300 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clickAndClose(id: string, setMenuOpen: (open: boolean) => void) {
  scrollTo(id);
  setMenuOpen(false);
}