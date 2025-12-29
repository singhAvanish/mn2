


// "use client";

// import { useState, useRef, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// export default function RailTwo({ rail }: any) {
//   const [activeCategory, setActiveCategory] = useState<number | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);

//   const railRef = useRef<HTMLDivElement | null>(null);
//   const modalRef = useRef<HTMLDivElement | null>(null);

//   const items = rail?.rail_items || [];

//   const openModal = (idx: number) => {
//     if (!items.length) return;
//     setActiveCategory(idx);
//     setActiveIndex(0);
//     setModalOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setActiveCategory(null);
//     document.body.style.overflow = "auto";
//     if (document.fullscreenElement) {
//       document.exitFullscreen?.().catch(() => {});
//     }
//   };

//   return (
//     <section
//       id="work-section"
//       className="
//         relative py-16 sm:py-20 md:py-24 px-4 sm:px-6
//         bg-gradient-to-b from-zinc-50 via-zinc-50 to-white
//         overflow-hidden
//       "
//     >
//       {/* soft background accents */}
//       <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-black/[0.035] blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-48 right-0 h-[520px] w-[520px] rounded-full bg-black/[0.03] blur-3xl" />

//       <div className="text-center mb-10 sm:mb-14 md:mb-16 relative z-10">
//         <div className="mx-auto mb-4 sm:mb-6 h-[3px] w-10 sm:w-12 md:w-16 rounded-full bg-gradient-to-r from-red-600 to-red-400" />
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950">
//           {rail?.rail_name}
//         </h2>
//       </div>

//       {/* GRID (2 per row on mobile) */}
//       <div
//         ref={railRef}
//         className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-10 max-w-7xl mx-auto"
//       >
//         {items.map((item: any, idx: number) => (
//           <motion.div
//             key={idx}
//             whileHover={{ y: -6 }}
//             transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             onClick={() => openModal(idx)}
//             className="
//               group cursor-pointer rounded-2xl overflow-hidden
//               bg-white shadow-[0_14px_40px_rgba(0,0,0,0.10)]
//               border border-zinc-200/70
//               hover:shadow-[0_22px_60px_rgba(0,0,0,0.14)]
//               transition
//             "
//           >
//             {/* IMAGE WRAPPER */}
//             <div className="relative">
//               <img
//                 src={item.buttonImage}
//                 className="
//                   w-full h-40 sm:h-56 md:h-72 object-cover
//                   transition duration-700
//                   group-hover:scale-[1.06]
//                 "
//                 alt=""
//               />

//               {/* overlay stack */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_55%)]" />

//               {/* heading */}
//               {item.heading && (
//                 <div className="absolute bottom-3 left-3 right-3">
//                   <p className="text-white font-semibold tracking-wide uppercase leading-snug text-xs sm:text-sm md:text-base drop-shadow">
//                     {item.heading}
//                   </p>
//                   <div className="mt-2 h-[2px] w-10 rounded-full bg-white/60 opacity-80" />
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {modalOpen && activeCategory !== null && (
//           <motion.div
//             ref={modalRef}
//             className="fixed inset-0 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             {/* backdrop */}
//             <motion.div
//               className="absolute inset-0 bg-black/70"
//               onClick={closeModal}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />
//             <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-400/10" />

//             {/* close */}
//           <motion.button
//   onClick={(e) => {
//     e.stopPropagation();
//     closeModal();
//   }}
//   className="
//     fixed top-4 sm:top-6 right-4 sm:right-6 z-[99999]
//     h-11 w-11 rounded-full
//     border border-white/15
//     bg-white/10 backdrop-blur-xl
//     text-white hover:bg-white/15
//     shadow-[0_14px_40px_rgba(0,0,0,0.35)]
//     flex items-center justify-center
//     transition
//   "
//   whileHover={{ y: -2 }}
//   whileTap={{ scale: 0.98 }}
//   aria-label="Close"
//   type="button"
// >
//   ✕
// </motion.button>


//             {/* body */}
//             <motion.div
//               initial={{ opacity: 0, y: 18, scale: 0.98 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 10, scale: 0.98 }}
//               transition={{ type: "spring", stiffness: 260, damping: 22 }}
//               className="relative z-10 w-full"
//             >
//               <ModalBody
//                 category={items[activeCategory]}
//                 activeIndex={activeIndex}
//                 setActiveIndex={setActiveIndex}
//                 modalRef={modalRef}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }

// // function ModalBody({ category, activeIndex, setActiveIndex, modalRef }: any) {
// //   const images: string[] = (category?.images || []).flat();
// //   const [viewMode, setViewMode] = useState<"uniform" | "real">("uniform");
// //   const [isFullscreen, setIsFullscreen] = useState(false);

// //   const caption = category?.name || category?.title || category?.label || "";

// //   useEffect(() => {
// //     setViewMode("uniform");
// //   }, [activeIndex]);

// //   const next = () => {
// //     if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
// //   };
// //   const prev = () => {
// //     if (activeIndex > 0) setActiveIndex(activeIndex - 1);
// //   };

// //   useEffect(() => {
// //     const onKey = (e: KeyboardEvent) => {
// //       if (e.key === "ArrowRight") next();
// //       if (e.key === "ArrowLeft") prev();
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, [activeIndex, images.length]);

// //   useEffect(() => {
// //     const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
// //     document.addEventListener("fullscreenchange", onFsChange);
// //     return () => document.removeEventListener("fullscreenchange", onFsChange);
// //   }, []);

// //   const handleMainClick = async () => {
// //     if (viewMode === "uniform") {
// //       setViewMode("real");
// //       return;
// //     }
// //     try {
// //       if (!document.fullscreenElement) {
// //         await modalRef.current?.requestFullscreen?.();
// //       } else {
// //         await document.exitFullscreen?.();
// //       }
// //     } catch {}
// //   };

// //   if (!images.length) return null;

// //   return (
// //     <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 mx-auto">
// //       {/* panel */}
// //       <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.45)] p-4 sm:p-6">
// //         {/* header */}
// //         <div className="flex items-center justify-between gap-4 mb-4">
// //           <div className="text-white/90">
// //             <div className="text-sm font-medium tracking-tight">{caption || "Gallery"}</div>
// //             <div className="text-xs text-white/60 mt-1">
// //               {viewMode === "uniform"
// //                 ? "Click main image to expand"
// //                 : "Click again for fullscreen"}
// //             </div>
// //           </div>

// //           <div className="text-xs text-white/70">
// //             {activeIndex + 1} / {images.length}
// //           </div>
// //         </div>

// //         {/* ✅ MOBILE-STYLE LAYOUT ON ALL SCREENS */}
// //         <div className="flex flex-col items-center">
// //           {/* MAIN IMAGE: smaller by default, bigger after click */}
// //           <button
// //             onClick={handleMainClick}
// //             className="
// //               rounded-2xl overflow-hidden
// //               border border-white/10
// //               shadow-[0_18px_60px_rgba(0,0,0,0.55)]
// //               bg-black/15
// //               focus:outline-none focus:ring-2 focus:ring-white/30
// //               transition
// //               w-full
// //             "
// //             style={{
// //               maxWidth: viewMode === "uniform" ? 520 : 980,
// //             }}
// //             title={viewMode === "uniform" ? "Click to expand" : "Click again for fullscreen"}
// //           >
// //             <AnimatePresence mode="wait">
// //               <motion.div
// //                 key={`${activeIndex}-${viewMode}`}
// //                 initial={{ opacity: 0, scale: 0.98, y: 10, filter: "blur(10px)" }}
// //                 animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
// //                 exit={{ opacity: 0, scale: 0.985, y: -6, filter: "blur(10px)" }}
// //                 transition={{ type: "spring", stiffness: 240, damping: 22 }}
// //               >
// //                 {viewMode === "uniform" ? (
// //                   <div className="aspect-[4/3] w-full bg-black/10">
// //                     <img src={images[activeIndex]} className="h-full w-full object-cover" alt="" />
// //                   </div>
// //                 ) : (
// //                   <img
// //                     src={images[activeIndex]}
// //                     className={
// //                       isFullscreen
// //                         ? "w-full max-h-screen object-contain"
// //                         : "w-full max-h-[78vh] object-contain"
// //                     }
// //                     alt=""
// //                   />
// //                 )}
// //               </motion.div>
// //             </AnimatePresence>
// //           </button>

// //           {/* helper text */}
// //           <div className="mt-3 text-center text-white/60 text-xs">
// //             {viewMode === "uniform" ? "Click image to expand" : "Click again for fullscreen"}
// //           </div>

// //           {/* thumbnail strip */}
// //           <div className="mt-4 w-full" style={{ maxWidth: 980 }}>
// //             <div className="overflow-x-auto">
// //               <div className="flex gap-2 px-1 pb-1">
// //                 {images.map((src, i) => (
// //                   <button
// //                     key={src + i}
// //                     onClick={() => setActiveIndex(i)}
// //                     className={`shrink-0 rounded-xl overflow-hidden border transition ${
// //                       i === activeIndex
// //                         ? "border-white/60 opacity-100"
// //                         : "border-white/10 opacity-70 hover:opacity-100"
// //                     }`}
// //                     style={{ width: 78, height: 58 }}
// //                     aria-label={`Open image ${i + 1}`}
// //                   >
// //                     <img src={src} className="h-full w-full object-cover" alt="" />
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* nav buttons */}
// //           <div className="mt-6 flex items-center justify-center gap-4">
// //             <button
// //               onClick={prev}
// //               disabled={activeIndex === 0}
// //               className="
// //                 h-11 w-11 rounded-full
// //                 border border-white/15
// //                 bg-white/10 backdrop-blur-xl
// //                 text-white hover:bg-white/15
// //                 disabled:opacity-40 disabled:cursor-not-allowed
// //                 flex items-center justify-center
// //                 transition
// //               "
// //             >
// //               ‹
// //             </button>

// //             <button
// //               onClick={next}
// //               disabled={activeIndex === images.length - 1}
// //               className="
// //                 h-11 w-11 rounded-full
// //                 border border-white/15
// //                 bg-white/10 backdrop-blur-xl
// //                 text-white hover:bg-white/15
// //                 disabled:opacity-40 disabled:cursor-not-allowed
// //                 flex items-center justify-center
// //                 transition
// //               "
// //             >
// //               ›
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// function ModalBody({ category, activeIndex, setActiveIndex, modalRef }: any) {
//   const images: string[] = (category?.images || []).flat();
//   const [viewMode, setViewMode] = useState<"uniform" | "real">("uniform");
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const caption = category?.name || category?.title || category?.label || category?.heading || "";

//   useEffect(() => {
//     setViewMode("uniform");
//   }, [activeIndex]);

//   const next = () => {
//     if (!images.length) return;
//     if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
//   };
//   const prev = () => {
//     if (!images.length) return;
//     if (activeIndex > 0) setActiveIndex(activeIndex - 1);
//   };

//   useEffect(() => {
//     const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", onFsChange);
//     return () => document.removeEventListener("fullscreenchange", onFsChange);
//   }, []);

//   // ✅ helpful in fullscreen: Esc exits fullscreen
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//       if (e.key === "Escape" && document.fullscreenElement) {
//         document.exitFullscreen?.().catch(() => {});
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [activeIndex, images.length]);

//   const handleMainClick = async () => {
//     if (viewMode === "uniform") {
//       setViewMode("real");
//       return;
//     }
//     try {
//       if (!document.fullscreenElement) {
//         await modalRef.current?.requestFullscreen?.();
//       } else {
//         await document.exitFullscreen?.();
//       }
//     } catch {}
//   };

//   const toggleFullscreen = async () => {
//     try {
//       if (!document.fullscreenElement) {
//         await modalRef.current?.requestFullscreen?.();
//       } else {
//         await document.exitFullscreen?.();
//       }
//     } catch {}
//   };

//   if (!images.length) return null;

//   return (
//     <div className="relative w-full max-w-6xl mx-auto">
//       {/* ================== MOBILE (Rail4-like card gallery) ================== */}
//       <div className="md:hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.45)] p-3">
//         {/* header */}
//         <div className="flex items-center justify-between gap-4 mb-4">
//           <div className="text-white/90 min-w-0">
//             <div className="text-sm font-medium tracking-tight truncate">
//               {caption || "Gallery"}
//             </div>
//             <div className="text-xs text-white/60 mt-1">
//               {viewMode === "uniform"
//                 ? "Tap image to enlarge"
//                 : isFullscreen
//                 ? "Fullscreen (tap image to exit)"
//                 : "Tap again for fullscreen"}
//             </div>
//           </div>
//           <div className="text-xs text-white/70 whitespace-nowrap">
//             {activeIndex + 1} / {images.length}
//           </div>
//         </div>

//         {/* main image */}
//         <button
//           onClick={handleMainClick}
//           type="button"
//           className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black/10 border border-white/10"
//         >
//           {viewMode === "uniform" ? (
//             <div className="aspect-[4/3] w-full bg-black/10">
//               <img
//                 src={images[activeIndex]}
//                 className="h-full w-full object-cover"
//                 alt=""
//               />
//             </div>
//           ) : (
//             <img
//               src={images[activeIndex]}
//               className={
//                 isFullscreen
//                   ? "w-full max-h-[100vh] object-contain"
//                   : "w-full max-h-[72vh] object-contain"
//               }
//               alt=""
//             />
//           )}
//         </button>

//         {/* thumbs */}
//         <div className="mt-4 overflow-x-auto">
//           <div className="flex gap-2 pb-1">
//             {images.map((src, i) => (
//               <button
//                 key={src + i}
//                 type="button"
//                 onClick={() => setActiveIndex(i)}
//                 className={`shrink-0 rounded-xl overflow-hidden border transition ${
//                   i === activeIndex ? "border-white/60 opacity-100" : "border-white/10 opacity-70"
//                 }`}
//                 style={{ width: 64, height: 48 }}
//                 aria-label={`Open image ${i + 1}`}
//               >
//                 <img src={src} className="h-full w-full object-cover" alt="" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* nav */}
//         <div className="mt-5 flex items-center justify-center gap-4">
//           <button
//             onClick={prev}
//             disabled={activeIndex === 0}
//             type="button"
//             className="h-11 w-11 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
//           >
//             ‹
//           </button>
//           <button
//             onClick={next}
//             disabled={activeIndex === images.length - 1}
//             type="button"
//             className="h-11 w-11 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
//           >
//             ›
//           </button>
//         </div>

//         {caption && (
//           <div className="mt-4 text-center text-white/85 text-sm font-medium">
//             {caption}
//           </div>
//         )}
//       </div>

//       {/* ================== DESKTOP (Rail4 premium gallery) ================== */}
//       <div className="hidden md:block">
//         <div
//           className="
//             w-full
//             rounded-[28px]
//             border border-white/12
//             bg-white/10 backdrop-blur-2xl
//             shadow-[0_40px_120px_rgba(0,0,0,0.55)]
//             overflow-hidden
//           "
//         >
//           {/* top bar */}
//           <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20">
//             <div className="min-w-0">
//               <div className="text-white font-medium tracking-tight truncate">
//                 {caption || "Gallery"}
//               </div>
//               <div className="text-white/55 text-xs mt-0.5">
//                 Use ← → keys • Click thumbnails • Esc to exit fullscreen/close
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               {viewMode === "real" && (
//                 <button
//                   type="button"
//                   onClick={toggleFullscreen}
//                   className="text-xs text-white/80 hover:text-white transition border border-white/15 bg-white/10 rounded-full px-3 py-1"
//                 >
//                   {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                 </button>
//               )}

//               <div className="text-white/70 text-sm whitespace-nowrap">
//                 {activeIndex + 1} / {images.length}
//               </div>
//             </div>
//           </div>

//           {/* body */}
//           <div className="grid grid-cols-[220px_1fr]">
//             {/* thumbnails */}
//             <div className="border-r border-white/10 bg-black/15">
//               <div className="h-[78vh] overflow-y-auto p-4 space-y-3">
//                 {images.map((src, i) => {
//                   const active = i === activeIndex;
//                   return (
//                     <button
//                       key={src + i}
//                       type="button"
//                       onClick={() => setActiveIndex(i)}
//                       className={`
//                         group w-full rounded-2xl overflow-hidden
//                         border transition
//                         ${active ? "border-white/60 bg-white/10" : "border-white/10 hover:border-white/25"}
//                       `}
//                       aria-label={`Open image ${i + 1}`}
//                     >
//                       {/* uniform thumb aspect */}
//                       <div className="aspect-[4/3] w-full bg-black/20">
//                         <img
//                           src={src}
//                           alt=""
//                           className={`h-full w-full object-cover transition duration-500 ${
//                             active ? "scale-[1.02]" : "group-hover:scale-[1.03]"
//                           }`}
//                         />
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* main preview */}
//             <div className="relative bg-black/10">
//               <div className="h-[78vh] w-full flex items-center justify-center p-6">
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={`${images[activeIndex]}-${viewMode}`}
//                     src={images[activeIndex]}
//                     alt=""
//                     className="w-full h-full object-contain"
//                     initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
//                     animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//                     exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
//                     transition={{ type: "spring", stiffness: 240, damping: 22 }}
//                     onClick={() => {
//                       // keep your original behavior: first click switches to real,
//                       // next click toggles fullscreen
//                       handleMainClick();
//                     }}
//                   />
//                 </AnimatePresence>
//               </div>

//               {/* arrows */}
//               {images.length > 1 && (
//                 <>
//                   <motion.button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       prev();
//                     }}
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="
//                       absolute left-5 top-1/2 -translate-y-1/2
//                       h-12 w-12 rounded-full
//                       border border-white/15
//                       bg-white/10 backdrop-blur-xl
//                       text-white hover:bg-white/15
//                       shadow-[0_18px_60px_rgba(0,0,0,0.45)]
//                       flex items-center justify-center
//                       transition
//                     "
//                     aria-label="Previous image"
//                   >
//                     ‹
//                   </motion.button>

//                   <motion.button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       next();
//                     }}
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="
//                       absolute right-5 top-1/2 -translate-y-1/2
//                       h-12 w-12 rounded-full
//                       border border-white/15
//                       bg-white/10 backdrop-blur-xl
//                       text-white hover:bg-white/15
//                       shadow-[0_18px_60px_rgba(0,0,0,0.45)]
//                       flex items-center justify-center
//                       transition
//                     "
//                     aria-label="Next image"
//                   >
//                     ›
//                   </motion.button>
//                 </>
//               )}

//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
//             </div>
//           </div>
//         </div>

//         {caption && (
//           <div className="mt-4 text-center text-white/85 text-sm font-medium">
//             {caption}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RailTwo({ rail }: any) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const railRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const items = rail?.rail_items || [];

  const openModal = (idx: number) => {
    if (!items.length) return;
    setActiveCategory(idx);
    setActiveIndex(0);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveCategory(null);
    document.body.style.overflow = "auto";
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  /* =========================================================
     RANDOM FLIP (EACH ITEM FLIPS EXACTLY ONCE, RANDOM ORDER)
     - One card animates at a time.
     - After flip finishes, card stays showing heading.
     - Slower flipping speed
     ========================================================= */

  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [animatingIdx, setAnimatingIdx] = useState<number | null>(null);

  const order = useMemo(() => {
    const n = items.length || 0;
    const arr = Array.from({ length: n }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [items.length]);

  const orderPosRef = useRef(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const n = items.length || 0;
    if (!n) return;

    setFlipped(Array(n).fill(false));
    setAnimatingIdx(null);
    orderPosRef.current = 0;
    runningRef.current = false;
  }, [items.length]);

  useEffect(() => {
    const n = items.length || 0;
    if (!n) return;
    if (runningRef.current) return;
    runningRef.current = true;

    let cancelled = false;
    let tStart: number | null = null;
    let tEnd: number | null = null;

    const FLIP_DURATION_MS = 1400;
    const GAP_BETWEEN_CARDS_MS = 1400;

    const runNext = () => {
      if (cancelled) return;

      const pos = orderPosRef.current;
      if (pos >= order.length) {
        setAnimatingIdx(null);
        return;
      }

      const idx = order[pos];
      setAnimatingIdx(idx);

      tEnd = window.setTimeout(() => {
        if (cancelled) return;

        setFlipped((prev) => {
          const copy = [...prev];
          copy[idx] = true;
          return copy;
        });

        setAnimatingIdx(null);
        orderPosRef.current += 1;

        tStart = window.setTimeout(() => {
          if (cancelled) return;
          runNext();
        }, GAP_BETWEEN_CARDS_MS);
      }, FLIP_DURATION_MS);
    };

    tStart = window.setTimeout(runNext, 1300);

    return () => {
      cancelled = true;
      if (tStart) window.clearTimeout(tStart);
      if (tEnd) window.clearTimeout(tEnd);
      runningRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, order]);

  return (
    <section
      id="work-section"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-zinc-50 via-zinc-50 to-white overflow-hidden"
    >
      <div className="text-center mb-10 sm:mb-14 md:mb-16 relative z-10">
        <div className="mx-auto mb-4 sm:mb-6 h-[3px] w-10 sm:w-12 md:w-16 rounded-full bg-gradient-to-r from-red-600 to-red-400" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950">
          {rail?.rail_name}
        </h2>
      </div>

      <div
        ref={railRef}
        className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-10 max-w-7xl mx-auto"
      >
        {items.map((item: any, idx: number) => {
          const isFlipped = !!flipped[idx];
          const isAnimating = animatingIdx === idx;

          return (
            <motion.div
              key={item?.id || item?.buttonImage || item?.heading || idx}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => openModal(idx)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-[0_14px_40px_rgba(0,0,0,0.10)] border border-zinc-200/70 hover:shadow-[0_22px_60px_rgba(0,0,0,0.14)] transition"
            >
              <FlipCard
                item={item}
                flipped={isFlipped || isAnimating}
                animateNow={isAnimating}
                duration={1.4}
              />
            </motion.div>
          );
        })}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && activeCategory !== null && (
          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-400/10" />

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="fixed top-4 sm:top-6 right-4 sm:right-6 z-[99999] h-11 w-11 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.35)] flex items-center justify-center transition"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Close"
              type="button"
            >
              ✕
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative z-10 w-full px-3 sm:px-6"
            >
              <ModalBodyUnified
                category={items[activeCategory]}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                modalRef={modalRef}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================
   FLIP CARD (UPSIDE-DOWN)
   ========================= */

function FlipCard({
  item,
  flipped,
  animateNow,
  duration,
}: {
  item: any;
  flipped: boolean;
  animateNow: boolean;
  duration: number;
}) {
  return (
    <div className="relative">
      <div className="relative w-full h-40 sm:h-56 md:h-72" style={{ perspective: 1400 }}>
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            willChange: "transform",
          }}
          animate={{ rotateX: flipped ? 180 : 0 }}
          transition={animateNow ? { duration, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateX(0deg) translateZ(2px)",
            }}
          >
            <img
              src={item.buttonImage}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.06]"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 bg-zinc-950 flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateX(180deg) translateZ(2px)",
            }}
          >
            <div className="text-center px-4">
              <div className="mx-auto mb-3 h-[3px] w-10 rounded-full bg-gradient-to-r from-red-600 to-red-400" />
              <p className="text-white font-semibold tracking-wide uppercase leading-snug text-xs sm:text-sm md:text-base">
                {item.heading || "View"}
              </p>
              <div className="mt-2 h-[2px] w-10 rounded-full bg-white/35 mx-auto" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* =====================================================
   UNIFIED MODAL BODY (DESKTOP STYLE FOR ALL)
   - Same layout on mobile and desktop
   - Auto-scroll starts immediately
   - Stops in fullscreen
   - Click main image -> fullscreen
   ===================================================== */

// function ModalBodyUnified({ category, activeIndex, setActiveIndex, modalRef }: any) {
//   const images: string[] = (category?.images || []).flat();
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const caption = category?.name || category?.title || category?.label || category?.heading || "";

//   // auto-scroll
//   const autoRef = useRef<number | null>(null);
//   const lastInteractRef = useRef<number>(Date.now() - 999999);

//   const markInteract = () => {
//     lastInteractRef.current = Date.now();
//   };

//   useEffect(() => {
//     const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", onFsChange);
//     return () => document.removeEventListener("fullscreenchange", onFsChange);
//   }, []);

//   useEffect(() => {
//     if (images.length <= 1) return;

//     // stop in fullscreen
//     if (isFullscreen) {
//       if (autoRef.current) clearInterval(autoRef.current);
//       autoRef.current = null;
//       return;
//     }

//     if (autoRef.current) clearInterval(autoRef.current);

//     autoRef.current = window.setInterval(() => {
//       if (Date.now() - lastInteractRef.current < 2500) return;
//       setActiveIndex((i: number) => (i + 1) % images.length);
//     }, 3000);

//     return () => {
//       if (autoRef.current) clearInterval(autoRef.current);
//       autoRef.current = null;
//     };
//   }, [images.length, isFullscreen, setActiveIndex]);

//   const next = () => {
//     markInteract();
//     if (!images.length) return;
//     setActiveIndex((i: number) => (i + 1) % images.length);
//   };
//   const prev = () => {
//     markInteract();
//     if (!images.length) return;
//     setActiveIndex((i: number) => (i - 1 + images.length) % images.length);
//   };

//   const openFullscreen = async () => {
//     markInteract();
//     try {
//       if (!document.fullscreenElement) {
//         await modalRef.current?.requestFullscreen?.();
//       }
//     } catch {}
//   };

//   if (!images.length) return null;

//   return (
//     <div
//       className="w-full max-w-6xl mx-auto rounded-[28px] border border-white/12 bg-white/10 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.55)] overflow-hidden"
//       onMouseMove={markInteract}
//       onTouchStart={markInteract}
//     >
//       {/* header */}
//       <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-black/20">
//         <div className="min-w-0">
//           <div className="text-white font-medium tracking-tight truncate">{caption || "Gallery"}</div>
//           <div className="text-white/55 text-[11px] sm:text-xs mt-0.5">
//             Auto plays every 3s • Tap image for fullscreen • Stops in fullscreen
//           </div>
//         </div>

//         <div className="text-white/70 text-sm whitespace-nowrap">
//           {activeIndex + 1} / {images.length}
//         </div>
//       </div>

//       {/* body */}
//       <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr]">
//         {/* thumbs */}
//         <div className="border-r border-white/10 bg-black/15">
//           <div className="h-[72vh] sm:h-[78vh] overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
//             {images.map((src, i) => {
//               const active = i === activeIndex;
//               return (
//                 <button
//                   key={src + i}
//                   type="button"
//                   onClick={() => {
//                     markInteract();
//                     setActiveIndex(i);
//                   }}
//                   className={`
//                     group w-full rounded-2xl overflow-hidden border transition
//                     ${active ? "border-white/60 bg-white/10" : "border-white/10 hover:border-white/25"}
//                   `}
//                 >
//                   <div className="aspect-[4/3] w-full bg-black/20">
//                     <img
//                       src={src}
//                       alt=""
//                       className={`h-full w-full object-cover transition duration-500 ${
//                         active ? "scale-[1.02]" : "group-hover:scale-[1.03]"
//                       }`}
//                     />
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* main */}
//         <div className="relative bg-black/10">
//           <div className="h-[72vh] sm:h-[78vh] w-full flex items-center justify-center p-3 sm:p-6">
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={images[activeIndex]}
//                 src={images[activeIndex]}
//                 alt=""
//                 className="w-full h-full object-contain cursor-pointer select-none"
//                 initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
//                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//                 exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
//                 transition={{ type: "spring", stiffness: 240, damping: 22 }}
//                 onClick={openFullscreen}
//                 draggable={false}
//               />
//             </AnimatePresence>
//           </div>

//           {images.length > 1 && (
//             <>
//               <motion.button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   prev();
//                 }}
//                 whileHover={{ y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex items-center justify-center transition"
//               >
//                 ‹
//               </motion.button>

//               <motion.button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   next();
//                 }}
//                 whileHover={{ y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex items-center justify-center transition"
//               >
//                 ›
//               </motion.button>
//             </>
//           )}

//           <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
//         </div>
//       </div>
//     </div>
//   );
// }

function ModalBodyUnified({ category, activeIndex, setActiveIndex, modalRef }: any) {
  const images: string[] = (category?.images || []).flat();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const caption = category?.name || category?.title || category?.label || category?.heading || "";

  // auto-scroll
  const autoRef = useRef<number | null>(null);
  const lastInteractRef = useRef<number>(Date.now() - 999999);

  // swipe
  const startX = useRef<number | null>(null);

  const markInteract = () => {
    lastInteractRef.current = Date.now();
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const clamp = (i: number) => {
    if (!images.length) return 0;
    const n = images.length;
    return ((i % n) + n) % n; // ✅ infinity
  };

  const next = () => {
    markInteract();
    if (!images.length) return;
    setActiveIndex((i: number) => clamp(i + 1));
  };

  const prev = () => {
    markInteract();
    if (!images.length) return;
    setActiveIndex((i: number) => clamp(i - 1));
  };

  const openFullscreen = async () => {
    markInteract();
    try {
      if (!document.fullscreenElement) {
        await modalRef.current?.requestFullscreen?.();
      }
    } catch {}
  };

  // autoplay (works on both, stops in fullscreen, pauses after interaction)
  useEffect(() => {
    if (images.length <= 1) return;

    if (isFullscreen) {
      if (autoRef.current) clearInterval(autoRef.current);
      autoRef.current = null;
      return;
    }

    if (autoRef.current) clearInterval(autoRef.current);

    autoRef.current = window.setInterval(() => {
      if (Date.now() - lastInteractRef.current < 2500) return;
      setActiveIndex((i: number) => clamp(i + 1));
    }, 3000);

    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
      autoRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, isFullscreen]);

  if (!images.length) return null;

  return (
    <div
      className="w-full max-w-6xl mx-auto rounded-[28px] border border-white/12 bg-white/10 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.55)] overflow-hidden"
      onMouseMove={markInteract}
      onTouchStart={markInteract}
    >
      {/* header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-black/20">
        <div className="min-w-0">
          <div className="text-white font-medium tracking-tight truncate">{caption || "Gallery"}</div>
          <div className="text-white/55 text-[11px] sm:text-xs mt-0.5">
            Auto plays every 3s • Swipe on mobile • Tap image for fullscreen
          </div>
        </div>

        <div className="text-white/70 text-sm whitespace-nowrap">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* ===========================
          MOBILE: 1 IMAGE + ARROWS BELOW
          =========================== */}
      {isMobile ? (
        <div className="bg-black/10">
          <div
            className="h-[66vh] w-full flex items-center justify-center p-3"
            onTouchStart={(e) => {
              markInteract();
              if (!e.touches?.[0]) return;
              startX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (startX.current === null) return;
              const endX = e.changedTouches?.[0]?.clientX ?? startX.current;
              const dx = endX - startX.current;
              startX.current = null;

              if (Math.abs(dx) < 40) return; // ignore small swipes
              if (dx < 0) next();
              else prev();
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={images[clamp(activeIndex)]}
                src={images[clamp(activeIndex)]}
                alt=""
                className="w-full h-full object-contain cursor-pointer select-none"
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                onClick={openFullscreen}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* arrows BELOW image */}
          {images.length > 1 && (
            <div className="pb-4 px-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prev}
                className="w-1/2 h-12 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex items-center justify-center transition"
              >
                ← Prev
              </button>

              <button
                type="button"
                onClick={next}
                className="w-1/2 h-12 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex items-center justify-center transition"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ===========================
           DESKTOP: your current layout (thumbs + main)
           =========================== */
        <div className="grid grid-cols-[180px_1fr]">
          {/* thumbs */}
          <div className="border-r border-white/10 bg-black/15">
            <div className="h-[78vh] overflow-y-auto p-4 space-y-3">
              {images.map((src, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => {
                      markInteract();
                      setActiveIndex(i);
                    }}
                    className={`
                      group w-full rounded-2xl overflow-hidden border transition
                      ${active ? "border-white/60 bg-white/10" : "border-white/10 hover:border-white/25"}
                    `}
                  >
                    <div className="aspect-[4/3] w-full bg-black/20">
                      <img
                        src={src}
                        alt=""
                        className={`h-full w-full object-cover transition duration-500 ${
                          active ? "scale-[1.02]" : "group-hover:scale-[1.03]"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* main */}
          <div className="relative bg-black/10">
            <div className="h-[78vh] w-full flex items-center justify-center p-6">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[clamp(activeIndex)]}
                  src={images[clamp(activeIndex)]}
                  alt=""
                  className="w-full h-full object-contain cursor-pointer select-none"
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  onClick={openFullscreen}
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex items-center justify-center transition"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-white hover:bg-white/15 shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex items-center justify-center transition"
                >
                  ›
                </button>
              </>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}
