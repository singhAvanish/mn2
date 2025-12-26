



// "use client";

// import { useState, useRef, useEffect } from "react";

// export default function RailThree({ rail }) {
//   const items = rail.rail_items || [];
//   const [index, setIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const startX = useRef(null);

//   /* -----------------------------------------------------------
//       RESPONSIVE CHECK
//   ----------------------------------------------------------- */
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   /* -----------------------------------------------------------
//       AUTO-SCROLL
//   ----------------------------------------------------------- */
//   useEffect(() => {
//     if (items.length <= 1) return;
//     const timer = setInterval(() => {
//       next();
//     }, 3500);
//     return () => clearInterval(timer);
//   }, [index, items.length]);

//   /* -----------------------------------------------------------
//       NAVIGATION
//   ----------------------------------------------------------- */
//   const prev = () => {
//     setIndex((i) => (i - 1 + items.length) % items.length);
//   };

//   const next = () => {
//     setIndex((i) => (i + 1) % items.length);
//   };

//   /* -----------------------------------------------------------
//       TOUCH SWIPE
//   ----------------------------------------------------------- */
//   const handleTouchStart = (e) => {
//     startX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     if (!startX.current) return;

//     const diff = e.changedTouches[0].clientX - startX.current;

//     if (diff > 50) prev();
//     if (diff < -50) next();

//     startX.current = null;
//   };

//   /* -----------------------------------------------------------
//       POSITION LOGIC (CENTER / LEFT / RIGHT / HIDDEN)
//   ----------------------------------------------------------- */
//   const getPosition = (i) => {
//     if (isMobile) {
//       return i === index ? "center" : "hidden";
//     }
//     if (i === index) return "center";
//     if (i === (index - 1 + items.length) % items.length) return "left";
//     if (i === (index + 1) % items.length) return "right";
//     return "hidden";
//   };

//   return (
//     <div
//       id="brands-section"
//       className="py-20 px-6 md:px-10 lg:px-16 bg-white"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* TITLE */}
//         <div className="text-center mb-16">
//           {/* Red accent line */}
//           <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
//             {rail.rail_name || "Brands We Worked With"}
//           </h2>
//           <p className="text-gray-400 text-lg">
//             Trusted by leading brands and creators.
//           </p>
//         </div>

//         {/* MAIN CAROUSEL */}
//         <div
//           className="relative w-full h-80 md:h-96 flex items-center justify-center overflow-hidden"
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {items.map((item, i) => {
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
//                     ? `translateX(${100 * (i - index)}%) scale(${
//                         isCenter ? 1 : 0.8
//                       })`
//                     : pos === "center"
//                     ? "translateX(0) scale(1.15)"
//                     : pos === "left"
//                     ? "translateX(-60%) scale(0.85)"
//                     : pos === "right"
//                     ? "translateX(60%) scale(0.85)"
//                     : "scale(0)",
//                 }}
//               >
//                 {/* LOGO CARD */}
//                 <div
//                   className={`relative p-8 md:p-10 rounded-xl bg-zinc-900 border transition-all duration-500 ${
//                     isCenter 
//                       ? "border-red-600 shadow-2xl shadow-red-600/20 scale-105" 
//                       : "border-gray-800 shadow-xl"
//                   }`}
//                 >
//                   {/* Red glow effect for center card */}
//                   {isCenter && (
//                     <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent rounded-xl pointer-events-none"></div>
//                   )}
                  
//                   <img
//                     src={item.brandImage}
//                     alt={item.brandName}
//                     className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10"
//                   />
//                 </div>

//                 {/* BRAND NAME */}
//                 <p
//                   className={`mt-6 font-bold transition-all text-center ${
//                     isCenter
//                       ? "text-white text-xl md:text-2xl"
//                       : "text-gray-500 text-lg"
//                   }`}
//                 >
//                   {item.brandName}
//                 </p>

//                 {/* Decorative line under active brand */}
//                 {isCenter && (
//                   <div className="w-12 h-0.5 bg-red-600 mt-2"></div>
//                 )}
//               </div>
//             );
//           })}

//           {/* DESKTOP ARROWS */}
//           {!isMobile && items.length > 1 && (
//             <>
//               <button
//                 onClick={prev}
//                 className="absolute left-2 md:left-6 w-14 h-14 bg-zinc-900 border border-gray-700 text-white rounded-md shadow-xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 z-50"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>

//               <button
//                 onClick={next}
//                 className="absolute right-2 md:right-6 w-14 h-14 bg-zinc-900 border border-gray-700 text-white rounded-md shadow-xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 z-50"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </>
//           )}
//         </div>

//         {/* DOT INDICATORS */}
//         <div className="flex justify-center gap-3 mt-12">
//           {items.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
//                 index === i 
//                   ? "bg-red-600 w-8" 
//                   : "bg-gray-700 w-2 hover:bg-gray-600"
//               }`}
//               aria-label={`Go to slide ${i + 1}`}
//             />
//           ))}
//         </div>

//         {/* Optional: Progress bar */}
//         <div className="max-w-md mx-auto mt-8">
//           <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ease-linear"
//               style={{ width: `${((index + 1) / items.length) * 100}%` }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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
//     <section id="brands-section" className="py-24 px-6 md:px-10 bg-[#f8f8f8]">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
//           <h2 className="text-5xl font-bold text-[#111]">
//             {rail.rail_name || "Brands We Worked With"}
//           </h2>
//           <p className="text-gray-600 mt-4">
//             Trusted by leading brands and creators.
//           </p>
//         </div>

//         <div
//           className="relative w-full h-80 md:h-96 flex items-center justify-center overflow-hidden"
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
//                   opacity: pos === "hidden" ? 0 : isCenter ? 1 : 0.45,
//                   zIndex: isCenter ? 40 : 20,
//                   transform: isMobile
//                     ? `translateX(${100 * (i - index)}%) scale(${isCenter ? 1 : 0.8})`
//                     : pos === "center"
//                     ? "translateX(0) scale(1.12)"
//                     : pos === "left"
//                     ? "translateX(-60%) scale(0.85)"
//                     : pos === "right"
//                     ? "translateX(60%) scale(0.85)"
//                     : "scale(0)",
//                 }}
//               >
//                 <div
//                   className={`relative p-8 rounded-xl bg-white border transition-all duration-500 ${
//                     isCenter
//                       ? "border-red-600 shadow-2xl shadow-red-600/15 scale-105"
//                       : "border-black/10 shadow-lg"
//                   }`}
//                 >
//                   <img
//                     src={item.brandImage}
//                     alt={item.brandName}
//                     className="w-32 h-32 md:w-40 md:h-40 object-contain"
//                   />
//                 </div>

//                 <p
//                   className={`mt-6 font-semibold transition-all text-center ${
//                     isCenter ? "text-[#111] text-xl" : "text-gray-500"
//                   }`}
//                 >
//                   {item.brandName}
//                 </p>

//                 {isCenter && <div className="w-12 h-0.5 bg-red-600 mt-2"></div>}
//               </div>
//             );
//           })}

//           {!isMobile && items.length > 1 && (
//             <>
//               <button
//                 onClick={prev}
//                 className="absolute left-2 md:left-6 w-14 h-14 bg-white border border-black/10 text-[#111] rounded-md shadow-xl flex items-center justify-center hover:border-red-600 hover:text-red-600 transition z-50"
//               >
//                 ←
//               </button>
//               <button
//                 onClick={next}
//                 className="absolute right-2 md:right-6 w-14 h-14 bg-white border border-black/10 text-[#111] rounded-md shadow-xl flex items-center justify-center hover:border-red-600 hover:text-red-600 transition z-50"
//               >
//                 →
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex justify-center gap-3 mt-12">
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
//     </section>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";

export default function RailThree({ rail }: any) {
  const items = rail.rail_items || [];
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => next(), 3500);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length]);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  const handleTouchStart = (e: any) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    if (!startX.current) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prev();
    if (diff < -50) next();
    startX.current = null;
  };

  const getPosition = (i: number) => {
    if (isMobile) return i === index ? "center" : "hidden";
    if (i === index) return "center";
    if (i === (index - 1 + items.length) % items.length) return "left";
    if (i === (index + 1) % items.length) return "right";
    return "hidden";
  };

  return (
    // ✅ keep id, keep logic, update design + make mobile compact
    <div id="brands-section" className="bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-14 sm:py-16 md:py-20">
        {/* ✅ Cinematic heading (smaller on mobile, same feel on desktop) */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="w-10 sm:w-12 md:w-16 h-1 bg-red-600 mx-auto mb-4 sm:mb-5 md:mb-6"></div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111]">
            {rail.rail_name || "Brands We Worked With"}
          </h2>

          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
            Trusted by leading brands and creators.
          </p>
        </div>

        {/* ✅ reduce height on mobile only */}
        <div
          className="relative w-full h-[280px] sm:h-80 md:h-96 flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item: any, i: number) => {
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
                    ? `translateX(${100 * (i - index)}%) scale(${isCenter ? 1 : 0.84})`
                    : pos === "center"
                    ? "translateX(0) scale(1.12)"
                    : pos === "left"
                    ? "translateX(-60%) scale(0.86)"
                    : pos === "right"
                    ? "translateX(60%) scale(0.86)"
                    : "scale(0)",
                }}
              >
                {/* ✅ card design updated (premium + consistent) */}
                <div
                  className={`relative rounded-2xl bg-white border transition-all duration-500 overflow-hidden
                    ${isCenter ? "border-red-600 shadow-2xl shadow-red-600/10" : "border-black/10 shadow-lg"}
                  `}
                >
                  {/* subtle highlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_55%)]" />

                  <div className="relative p-6 sm:p-7 md:p-8">
                    <img
                      src={item.brandImage}
                      alt={item.brandName}
                      className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                    />
                  </div>

                  {/* ✅ small red underline only for center */}
                  {isCenter && (
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                  )}
                </div>

                {/* ✅ label spacing smaller on mobile */}
                <p
                  className={`mt-4 sm:mt-6 font-semibold transition-all text-center ${
                    isCenter ? "text-[#111] text-lg sm:text-xl" : "text-gray-500 text-base"
                  }`}
                >
                  {item.brandName}
                </p>

                {/* small accent bar */}
                {isCenter && <div className="w-10 sm:w-12 h-0.5 bg-red-600 mt-2"></div>}
              </div>
            );
          })}

          {/* ✅ desktop arrows unchanged visually but slightly refined */}
          {!isMobile && items.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:left-6 w-14 h-14 bg-white border border-black/10 text-[#111] rounded-full shadow-xl flex items-center justify-center hover:border-red-600 hover:text-red-600 transition z-50"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:right-6 w-14 h-14 bg-white border border-black/10 text-[#111] rounded-full shadow-xl flex items-center justify-center hover:border-red-600 hover:text-red-600 transition z-50"
                aria-label="Next"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* ✅ dots closer on mobile */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 md:mt-12">
          {items.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i ? "bg-red-600 w-8" : "bg-black/20 w-2 hover:bg-black/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

