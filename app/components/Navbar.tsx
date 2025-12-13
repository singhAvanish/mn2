"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a] text-white px-6 md:px-12 py-5 flex items-center justify-between z-50 border-b border-gray-800/50">
      
      {/* BRAND - Left aligned with icon */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 16H7V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-wide uppercase">FILMA</h1>
      </div>

      {/* DESKTOP MENU - Right aligned */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <button onClick={() => scrollTo("home-section")} className="hover:text-red-500 transition-colors">
          Home
        </button>
        <button onClick={() => scrollTo("about-section")} className="hover:text-red-500 transition-colors">
          Our Movies
        </button>
        
        {/* Pages dropdown simulation */}
        <div className="relative group">
          <button className="hover:text-red-500 transition-colors flex items-center gap-1">
            Pages
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        <button onClick={() => scrollTo("work-section")} className="hover:text-red-500 transition-colors">
          Services
        </button>

        {/* News dropdown simulation */}
        <div className="relative group">
          <button className="hover:text-red-500 transition-colors flex items-center gap-1">
            News
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        <button onClick={() => scrollTo("contact-section")} className="hover:text-red-500 transition-colors">
          Contact Us
        </button>

        {/* Search icon */}
        <button className="text-red-500 hover:text-red-400 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>

      {/* HAMBURGER ICON (Mobile) */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-gray-800/50 text-white py-6 px-6 flex flex-col gap-4 text-sm md:hidden animate-slideDown">
          <button onClick={() => clickAndClose("home-section", setMenuOpen)} className="text-left hover:text-red-500 transition-colors">
            Home
          </button>
          <button onClick={() => clickAndClose("about-section", setMenuOpen)} className="text-left hover:text-red-500 transition-colors">
            Our Movies
          </button>
          <button onClick={() => clickAndClose("work-section", setMenuOpen)} className="text-left hover:text-red-500 transition-colors">
            Services
          </button>
          <button onClick={() => clickAndClose("brands-section", setMenuOpen)} className="text-left hover:text-red-500 transition-colors">
            News
          </button>
          <button onClick={() => clickAndClose("contact-section", setMenuOpen)} className="text-left hover:text-red-500 transition-colors">
            Contact Us
          </button>
        </div>
      )}

      {/* Animation Style */}
      <style jsx>{`
        .animate-slideDown {
          animation: slideDown 0.25s ease-out forwards;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </nav>
  );
}

/* Smooth scroll function */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Close menu after clicking in mobile */
function clickAndClose(id, setMenuOpen) {
  scrollTo(id);
  setMenuOpen(false);
}