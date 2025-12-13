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
      className="py-16 px-6 md:px-10 bg-[#f3e9dd]"
    >
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3d2b1f] drop-shadow">
            {rail.rail_name || "Brands we worked with"}
          </h2>
          <p className="text-[#6d5b4d] mt-2">
            Trusted by leading brands and creators.
          </p>
        </div>

        {/* MAIN CAROUSEL */}
        <div
          className="relative w-full h-72 md:h-80 flex items-center justify-center overflow-hidden"
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
                  opacity: pos === "hidden" ? 0 : isCenter ? 1 : 0.5,
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
                  className={`relative p-6 md:p-8 rounded-2xl shadow-xl bg-[#1d130f]/80 border border-[#6d5b4d]/40 backdrop-blur-md ${
                    isCenter ? "scale-105" : ""
                  } transition-all duration-500`}
                >
                  <img
                    src={item.brandImage}
                    alt={item.brandName}
                    className="w-28 h-28 md:w-32 md:h-32 object-contain"
                  />
                </div>

                {/* BRAND NAME */}
                <p
                  className={`mt-4 font-bold transition-all text-center ${
                    isCenter
                      ? "text-[#3d2b1f] text-xl md:text-2xl"
                      : "text-[#6d5b4d]"
                  }`}
                >
                  {item.brandName}
                </p>
              </div>
            );
          })}

          {/* DESKTOP ARROWS */}
          {!isMobile && items.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:left-6 w-12 h-12 bg-[#e8d5c4] text-[#3d2b1f] rounded-full shadow-md text-xl flex items-center justify-center hover:bg-[#dac8b8] transition"
              >
                ←
              </button>

              <button
                onClick={next}
                className="absolute right-2 md:right-6 w-12 h-12 bg-[#e8d5c4] text-[#3d2b1f] rounded-full shadow-md text-xl flex items-center justify-center hover:bg-[#dac8b8] transition"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* DOT INDICATORS */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === i ? "bg-[#3d2b1f]" : "bg-[#3d2b1f]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
