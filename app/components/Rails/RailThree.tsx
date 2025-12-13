"use client";

import { useState, useRef, useEffect } from "react";

export default function RailThree({ rail }) {
  const items = rail.rail_items || [];
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const startX = useRef(null);

  /* -----------------------------------------------------------
      RESPONSIVE CHECK
  ----------------------------------------------------------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* -----------------------------------------------------------
      AUTO-SCROLL
  ----------------------------------------------------------- */
  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      next();
    }, 3500);
    return () => clearInterval(timer);
  }, [index, items.length]);

  /* -----------------------------------------------------------
      NAVIGATION
  ----------------------------------------------------------- */
  const prev = () => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  };

  const next = () => {
    setIndex((i) => (i + 1) % items.length);
  };

  /* -----------------------------------------------------------
      TOUCH SWIPE
  ----------------------------------------------------------- */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!startX.current) return;

    const diff = e.changedTouches[0].clientX - startX.current;

    if (diff > 50) prev();
    if (diff < -50) next();

    startX.current = null;
  };

  /* -----------------------------------------------------------
      POSITION LOGIC (CENTER / LEFT / RIGHT / HIDDEN)
  ----------------------------------------------------------- */
  const getPosition = (i) => {
    if (isMobile) {
      return i === index ? "center" : "hidden";
    }
    if (i === index) return "center";
    if (i === (index - 1 + items.length) % items.length) return "left";
    if (i === (index + 1) % items.length) return "right";
    return "hidden";
  };

  return (
    <section
      id="brands-section"
      className="py-20 px-6 md:px-10 lg:px-16 bg-zinc-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-16">
          {/* Red accent line */}
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {rail.rail_name || "Brands We Worked With"}
          </h2>
          <p className="text-gray-400 text-lg">
            Trusted by leading brands and creators.
          </p>
        </div>

        {/* MAIN CAROUSEL */}
        <div
          className="relative w-full h-80 md:h-96 flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, i) => {
            const pos = getPosition(i);
            const isCenter = pos === "center";

            return (
              <div
                key={i}
                className="absolute transition-all duration-700 ease-out flex flex-col items-center"
                style={{
                  opacity: pos === "hidden" ? 0 : isCenter ? 1 : 0.4,
                  zIndex: isCenter ? 40 : 20,
                  transform: isMobile
                    ? `translateX(${100 * (i - index)}%) scale(${
                        isCenter ? 1 : 0.8
                      })`
                    : pos === "center"
                    ? "translateX(0) scale(1.15)"
                    : pos === "left"
                    ? "translateX(-60%) scale(0.85)"
                    : pos === "right"
                    ? "translateX(60%) scale(0.85)"
                    : "scale(0)",
                }}
              >
                {/* LOGO CARD */}
                <div
                  className={`relative p-8 md:p-10 rounded-xl bg-zinc-900 border transition-all duration-500 ${
                    isCenter 
                      ? "border-red-600 shadow-2xl shadow-red-600/20 scale-105" 
                      : "border-gray-800 shadow-xl"
                  }`}
                >
                  {/* Red glow effect for center card */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent rounded-xl pointer-events-none"></div>
                  )}
                  
                  <img
                    src={item.brandImage}
                    alt={item.brandName}
                    className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10"
                  />
                </div>

                {/* BRAND NAME */}
                <p
                  className={`mt-6 font-bold transition-all text-center ${
                    isCenter
                      ? "text-white text-xl md:text-2xl"
                      : "text-gray-500 text-lg"
                  }`}
                >
                  {item.brandName}
                </p>

                {/* Decorative line under active brand */}
                {isCenter && (
                  <div className="w-12 h-0.5 bg-red-600 mt-2"></div>
                )}
              </div>
            );
          })}

          {/* DESKTOP ARROWS */}
          {!isMobile && items.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:left-6 w-14 h-14 bg-zinc-900 border border-gray-700 text-white rounded-md shadow-xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 z-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={next}
                className="absolute right-2 md:right-6 w-14 h-14 bg-zinc-900 border border-gray-700 text-white rounded-md shadow-xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 z-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* DOT INDICATORS */}
        <div className="flex justify-center gap-3 mt-12">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === i 
                  ? "bg-red-600 w-8" 
                  : "bg-gray-700 w-2 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Optional: Progress bar */}
        <div className="max-w-md mx-auto mt-8">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ease-linear"
              style={{ width: `${((index + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}