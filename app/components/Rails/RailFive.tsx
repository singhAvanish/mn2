// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";

// export default function RailFive({ rail }: any) {
//   const items = Array.isArray(rail?.rail_items) ? rail.rail_items : [];

//   // Desktop/tablet pages (3 per slide)
//   const pages = useMemo(() => {
//     const chunk = 3;
//     const out: any[] = [];
//     for (let i = 0; i < items.length; i += chunk) {
//       out.push(items.slice(i, i + chunk));
//     }
//     return out.length ? out : [[]];
//   }, [items]);

//   const [page, setPage] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   // swipe handling
//   const startX = useRef<number | null>(null);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const next = () => {
//     if (isMobile) {
//       setPage((p) => (p + 1) % Math.max(1, items.length));
//     } else {
//       setPage((p) => Math.min(p + 1, pages.length - 1));
//     }
//   };

//   const prev = () => {
//     if (isMobile) {
//       setPage((p) => (p - 1 + Math.max(1, items.length)) % Math.max(1, items.length));
//     } else {
//       setPage((p) => Math.max(p - 1, 0));
//     }
//   };

//   // Mobile swipe
//   const onTouchStart = (e: any) => {
//     startX.current = e.touches?.[0]?.clientX ?? null;
//   };

//   const onTouchEnd = (e: any) => {
//     if (startX.current === null) return;
//     const endX = e.changedTouches?.[0]?.clientX ?? startX.current;
//     const diff = endX - startX.current;

//     if (diff > 50) prev();
//     if (diff < -50) next();

//     startX.current = null;
//   };

//   const visibleItems = isMobile
//     ? items[page]
//       ? [items[page]]
//       : []
//     : pages[page] || [];

//   const dotsCount = isMobile ? items.length : pages.length;

//   return (
//     <section
//       id="review-section"
//       className="bg-[#f8f8f8] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Heading */}
//         <div className="text-center mb-10 sm:mb-12 md:mb-16">
//           <div className="w-10 sm:w-12 md:w-16 h-1 bg-red-600 mx-auto mb-4 sm:mb-6" />
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111]">
//             {rail?.rail_name || "Top Reviews"}
//           </h2>
//           <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base md:text-lg">
//             What people say after working with us
//           </p>
//         </div>

//         {/* Slider */}
//         <div
//           className="relative"
//           onTouchStart={isMobile ? onTouchStart : undefined}
//           onTouchEnd={isMobile ? onTouchEnd : undefined}
//         >
//           {/* Desktop arrows */}
//           {!isMobile && pages.length > 1 && (
//             <>
//               <button
//                 onClick={prev}
//                 className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition"
//               >
//                 ‹
//               </button>

//               <button
//                 onClick={next}
//                 className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition"
//               >
//                 ›
//               </button>
//             </>
//           )}

//           {/* Cards */}
//           <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-3 gap-6"}>
//             {visibleItems.map((r: any, idx: number) => {
//               const userName = r.userName || "User";
//               const reviewText = r.review || "";
//               const rating = parseInt(String(r.rating ?? "0"), 10);

//               return (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-2xl shadow-lg border border-black/5 p-6 sm:p-7 relative overflow-hidden"
//                 >
//                   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_60%)]" />

//                   <div className="relative">
//                     <div className="flex items-start justify-between gap-4">
//                       <div>
//                         <p className="font-semibold text-[#111] text-base sm:text-lg">
//                           {userName}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">Verified Review</p>
//                       </div>

//                       <Stars value={rating} />
//                     </div>

//                     <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
//                       “{reviewText}”
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Dots */}
//           {dotsCount > 1 && (
//             <div className="flex justify-center gap-2 mt-6">
//               {Array.from({ length: dotsCount }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setPage(i)}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     page === i ? "bg-red-600 w-8" : "bg-black/20 w-2"
//                   }`}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Helper */}
//           {isMobile && items.length > 1 && (
//             <p className="text-center text-xs text-gray-500 mt-3">
//               Swipe left or right to see more reviews
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Stars({ value }: { value: number }) {
//   const v = Math.min(5, Math.max(0, Number.isFinite(value) ? value : 0));
//   return (
//     <div className="flex items-center gap-1">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <span key={i} className={`text-sm ${i < v ? "text-red-600" : "text-black/15"}`}>
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }



"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RailFive({ rail }: any) {
  const items = Array.isArray(rail?.rail_items) ? rail.rail_items : [];

  // Desktop/tablet pages (3 per slide)
  const pages = useMemo(() => {
    const chunk = 3;
    const out: any[] = [];
    for (let i = 0; i < items.length; i += chunk) out.push(items.slice(i, i + chunk));
    return out.length ? out : [[]];
  }, [items]);

  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // swipe handling
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = () => {
    if (isMobile) {
      setPage((p) => (p + 1) % Math.max(1, items.length));
    } else {
      setPage((p) => Math.min(p + 1, pages.length - 1));
    }
  };

  const prev = () => {
    if (isMobile) {
      setPage((p) => (p - 1 + Math.max(1, items.length)) % Math.max(1, items.length));
    } else {
      setPage((p) => Math.max(p - 1, 0));
    }
  };

  // Mobile swipe
  const onTouchStart = (e: any) => {
    startX.current = e.touches?.[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: any) => {
    if (startX.current === null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? startX.current;
    const diff = endX - startX.current;

    if (diff > 50) prev();
    if (diff < -50) next();

    startX.current = null;
  };

  const visibleItems = isMobile
    ? items[page]
      ? [items[page]]
      : []
    : pages[page] || [];

  const dotsCount = isMobile ? items.length : pages.length;

  const title = rail?.rail_name || "Top Reviews";
  const subtitle = "What people say after working with us";

  return (
    <section
      id="review-section"
      className="relative bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* soft accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-600/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-[520px] w-[520px] rounded-full bg-black/[0.03] blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="mx-auto mb-4 sm:mb-6 h-[3px] w-10 sm:w-12 md:w-16 rounded-full bg-gradient-to-r from-red-600 to-red-400" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950">
            {title}
          </h2>
          <p className="mt-2 sm:mt-3 text-zinc-600 text-sm sm:text-base md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onTouchStart={isMobile ? onTouchStart : undefined}
          onTouchEnd={isMobile ? onTouchEnd : undefined}
        >
          {/* Desktop arrows */}
          {!isMobile && pages.length > 1 && (
            <>
              <motion.button
                onClick={prev}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="
                  absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10
                  h-12 w-12 rounded-full
                  bg-white/80 backdrop-blur-xl
                  border border-black/10 text-zinc-900
                  shadow-xl
                  hover:border-red-600 hover:text-red-600
                  transition
                "
                aria-label="Previous"
                type="button"
              >
                ‹
              </motion.button>

              <motion.button
                onClick={next}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="
                  absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10
                  h-12 w-12 rounded-full
                  bg-white/80 backdrop-blur-xl
                  border border-black/10 text-zinc-900
                  shadow-xl
                  hover:border-red-600 hover:text-red-600
                  transition
                "
                aria-label="Next"
                type="button"
              >
                ›
              </motion.button>
            </>
          )}

          {/* Cards container (animated per page) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${isMobile ? "m" : "d"}-${page}`}
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-3 gap-6"}
            >
              {visibleItems.map((r: any, idx: number) => {
                const userName = r.userName || "User";
                const reviewText = r.review || "";
                const rating = parseInt(String(r.rating ?? "0"), 10);

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="
                      relative overflow-hidden rounded-3xl
                      border border-black/10
                      bg-white/80 backdrop-blur-xl
                      shadow-[0_16px_40px_rgba(0,0,0,0.10)]
                      p-6 sm:p-7
                    "
                  >
                    {/* soft shine */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_60%)]" />
                    <div className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.10),transparent_55%)]" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight">
                            {userName}
                          </p>
                          <p className="text-xs text-zinc-500 mt-1">Verified Review</p>
                        </div>

                        <Stars value={rating} />
                      </div>

                      <p className="mt-4 text-sm sm:text-base text-zinc-700 leading-relaxed">
                        “{reviewText}”
                      </p>

                      {/* subtle divider */}
                      <div className="mt-5 h-px w-full bg-black/10" />

                      {/* micro footer */}
                      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                        <span>Client feedback</span>
                        <span className="text-red-600/80 font-medium">★★★★★</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          {dotsCount > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: dotsCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    page === i ? "bg-red-600 w-8" : "bg-black/20 w-2 hover:bg-black/30"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                  type="button"
                />
              ))}
            </div>
          )}

          {/* Helper */}
          {isMobile && items.length > 1 && (
            <p className="text-center text-xs text-zinc-500 mt-3">
              Swipe left or right to see more reviews
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  const v = Math.min(5, Math.max(0, Number.isFinite(value) ? value : 0));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < v ? "text-red-600" : "text-black/15"}`}>
          ★
        </span>
      ))}
    </div>
  );
}
