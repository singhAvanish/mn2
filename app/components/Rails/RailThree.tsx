

// "use client";

// import { useState, useRef, useEffect } from "react";

// export default function RailThree({ rail }: any) {
//   const items = rail.rail_items || [];
//   const [index, setIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const startX = useRef<number | null>(null);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   useEffect(() => {
//     if (items.length <= 1) return;
//     const timer = setInterval(() => next(), 3500);
//     return () => clearInterval(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [index, items.length]);

//   const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
//   const next = () => setIndex((i) => (i + 1) % items.length);

//   const handleTouchStart = (e: any) => {
//     startX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e: any) => {
//     if (!startX.current) return;
//     const diff = e.changedTouches[0].clientX - startX.current;
//     if (diff > 50) prev();
//     if (diff < -50) next();
//     startX.current = null;
//   };

//   const getPosition = (i: number) => {
//     if (isMobile) return i === index ? "center" : "hidden";
//     if (i === index) return "center";
//     if (i === (index - 1 + items.length) % items.length) return "left";
//     if (i === (index + 1) % items.length) return "right";
//     return "hidden";
//   };

//   return (
//     // ✅ keep id, keep logic, update design + make mobile compact
//     <div id="brands-section" className="bg-[#f8f8f8]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-14 sm:py-16 md:py-20">
//         {/* ✅ Cinematic heading (smaller on mobile, same feel on desktop) */}
//         <div className="text-center mb-10 sm:mb-12 md:mb-16">
//           <div className="w-10 sm:w-12 md:w-16 h-1 bg-red-600 mx-auto mb-4 sm:mb-5 md:mb-6"></div>

//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111]">
//             {rail.rail_name || "Brands We Worked With"}
//           </h2>

//           <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
//             Trusted by leading brands and creators.
//           </p>
//         </div>

//         {/* ✅ reduce height on mobile only */}
//         <div
//           className="relative w-full h-[280px] sm:h-80 md:h-96 flex items-center justify-center overflow-hidden"
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {items.map((item: any, i: number) => {
//             const pos = getPosition(i);
//             const isCenter = pos === "center";

//             return (
//               <div
//                 key={i}
//                 className="absolute transition-all duration-700 ease-out flex flex-col items-center"
//                 style={{
//                   opacity: pos === "hidden" ? 0 : isCenter ? 1 : 0.4,
//                   zIndex: isCenter ? 40 : 20,
//                   transform: isMobile
//                     ? `translateX(${100 * (i - index)}%) scale(${isCenter ? 1 : 0.84})`
//                     : pos === "center"
//                     ? "translateX(0) scale(1.12)"
//                     : pos === "left"
//                     ? "translateX(-60%) scale(0.86)"
//                     : pos === "right"
//                     ? "translateX(60%) scale(0.86)"
//                     : "scale(0)",
//                 }}
//               >
//                 {/* ✅ card design updated (premium + consistent) */}
//                 <div
//                   className={`relative rounded-2xl bg-white border transition-all duration-500 overflow-hidden
//                     ${isCenter ? "border-red-600 shadow-2xl shadow-red-600/10" : "border-black/10 shadow-lg"}
//                   `}
//                 >
//                   {/* subtle highlight */}
//                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_55%)]" />

//                   <div className="relative p-6 sm:p-7 md:p-8">
//                     <img
//                       src={item.brandImage}
//                       alt={item.brandName}
//                       className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
//                     />
//                   </div>

//                   {/* ✅ small red underline only for center */}
//                   {isCenter && (
//                     <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
//                   )}
//                 </div>

//                 {/* ✅ label spacing smaller on mobile */}
//                 <p
//                   className={`mt-4 sm:mt-6 font-semibold transition-all text-center ${
//                     isCenter ? "text-[#111] text-lg sm:text-xl" : "text-gray-500 text-base"
//                   }`}
//                 >
//                   {item.brandName}
//                 </p>

//                 {/* small accent bar */}
//                 {isCenter && <div className="w-10 sm:w-12 h-0.5 bg-red-600 mt-2"></div>}
//               </div>
//             );
//           })}

//           {/* ✅ desktop arrows unchanged visually but slightly refined */}
//           {!isMobile && items.length > 1 && (
//             <>
//               <button
//                 onClick={prev}
//                 className="absolute left-2 md:left-6 w-14 h-14 bg-white border border-black/10 text-[#111] rounded-full shadow-xl flex items-center justify-center hover:border-red-600 hover:text-red-600 transition z-50"
//                 aria-label="Previous"
//               >
//                 ←
//               </button>
//               <button
//                 onClick={next}
//                 className="absolute right-2 md:right-6 w-14 h-14 bg-white border border-black/10 text-[#111] rounded-full shadow-xl flex items-center justify-center hover:border-red-600 hover:text-red-600 transition z-50"
//                 aria-label="Next"
//               >
//                 →
//               </button>
//             </>
//           )}
//         </div>

//         {/* ✅ dots closer on mobile */}
//         <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 md:mt-12">
//           {items.map((_: any, i: number) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 index === i ? "bg-red-600 w-8" : "bg-black/20 w-2 hover:bg-black/30"
//               }`}
//               aria-label={`Go to slide ${i + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";

export default function RailThree({ rail }: any) {
  const items = Array.isArray(rail?.rail_items) ? rail.rail_items : [];
  const n = items.length;

  const [isMobile, setIsMobile] = useState(false);

  // virtualIndex always moves forward (direction consistent)
  const [virtualIndex, setVirtualIndex] = useState(0);

  const startX = useRef<number | null>(null);
  const isHoldingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  // responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // keep virtualIndex valid
  useEffect(() => {
    if (!n) return;
    setVirtualIndex((v) => ((v % n) + n) % n);
  }, [n]);

  const index = n ? ((virtualIndex % n) + n) % n : 0;

  // infinite autoplay (always forward)
  useEffect(() => {
    if (n <= 1) return;

    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (isHoldingRef.current) return;
      setVirtualIndex((v) => v + 1);
    }, 3500);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [n]);

  const next = () => {
    if (n <= 1) return;
    setVirtualIndex((v) => v + 1);
  };

  // prev but still forward (so direction never reverses)
  const prev = () => {
    if (n <= 1) return;
    setVirtualIndex((v) => v + (n - 1));
  };

  // swipe
  const handleTouchStart = (e: any) => {
    if (n <= 1) return;
    startX.current = e.touches?.[0]?.clientX ?? null;
    isHoldingRef.current = true;
  };

  const handleTouchEnd = (e: any) => {
    if (n <= 1) return;

    const sx = startX.current;
    if (sx === null) {
      isHoldingRef.current = false;
      return;
    }

    const endX = e.changedTouches?.[0]?.clientX ?? sx;
    const diff = endX - sx;

    if (diff > 50) prev();      // swipe right
    if (diff < -50) next();     // swipe left

    startX.current = null;

    setTimeout(() => {
      isHoldingRef.current = false;
    }, 600);
  };

  // ✅ mobile-safe circular offset (prevents teleport)
  const circularOffset = (i: number, current: number) => {
    if (!n) return 0;

    // raw distance (could be large at wrap)
    const diff = i - current;

    // normalize to range [-n/2, n/2]
    let normalized = ((diff % n) + n) % n; // [0..n-1]
    if (normalized > n / 2) normalized -= n; // now [-n/2..n/2]

    return normalized;
  };

  const getPosition = (i: number) => {
    if (!n) return "hidden";
    if (isMobile) return i === index ? "center" : "hidden";
    if (i === index) return "center";
    if (i === (index - 1 + n) % n) return "left";
    if (i === (index + 1) % n) return "right";
    return "hidden";
  };

  if (!n) return null;

  return (
    <div id="brands-section" className="bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-14 sm:py-16 md:py-20">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="w-10 sm:w-12 md:w-16 h-1 bg-red-600 mx-auto mb-4 sm:mb-5 md:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111]">
            {rail?.rail_name || "Brands We Worked With"}
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
            Trusted by leading brands and creators.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative w-full h-[260px] sm:h-80 md:h-96 flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item: any, i: number) => {
            const pos = getPosition(i);
            const isCenter = pos === "center";

            // ✅ offset that stays small even at wrap
            const offset = isMobile ? circularOffset(i, index) : 0;

            return (
              <div
                key={i}
                className="absolute transition-all duration-700 ease-out flex flex-col items-center"
                style={{
                  opacity: pos === "hidden" ? 0 : isCenter ? 1 : 0.4,
                  zIndex: isCenter ? 40 : 20,
                  transform: isMobile
                    ? `translateX(${100 * offset}%) scale(${isCenter ? 1 : 0.84})`
                    : pos === "center"
                    ? "translateX(0) scale(1.12)"
                    : pos === "left"
                    ? "translateX(-60%) scale(0.86)"
                    : pos === "right"
                    ? "translateX(60%) scale(0.86)"
                    : "scale(0)",
                }}
              >
                <div
                  className={`relative rounded-2xl bg-white border transition-all duration-500 overflow-hidden
                    ${isCenter ? "border-red-600 shadow-2xl shadow-red-600/10" : "border-black/10 shadow-lg"}
                  `}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_55%)]" />
                  <div className="relative p-6 sm:p-7 md:p-8">
                    <img
                      src={item.brandImage}
                      alt={item.brandName}
                      className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                    />
                  </div>
                  {isCenter && (
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                  )}
                </div>

                <p
                  className={`mt-4 sm:mt-6 font-semibold transition-all text-center ${
                    isCenter ? "text-[#111] text-lg sm:text-xl" : "text-gray-500 text-base"
                  }`}
                >
                  {item.brandName}
                </p>

                {isCenter && <div className="w-10 sm:w-12 h-0.5 bg-red-600 mt-2" />}
              </div>
            );
          })}

          {/* Desktop arrows */}
          {!isMobile && n > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:left-6 w-14 h-14 bg-white border border-black/10 text-[#111] rounded-full shadow-xl flex items-center justify-center hover:border-red-600 hover:text-red-600 transition z-50"
                aria-label="Previous"
                type="button"
              >
                ←
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:right-6 w-14 h-14 bg-white border border-black/10 text-[#111] rounded-full shadow-xl flex items-center justify-center hover:border-red-600 hover:text-red-600 transition z-50"
                aria-label="Next"
                type="button"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 md:mt-12">
          {items.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setVirtualIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i ? "bg-red-600 w-8" : "bg-black/20 w-2 hover:bg-black/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
