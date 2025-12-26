// "use client";

// import { useState, useRef, useEffect, useMemo } from "react";

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

//     // exit fullscreen if open
//     if (document.fullscreenElement) {
//       document.exitFullscreen?.().catch(() => {});
//     }
//   };

//   return (
//     <section className="py-20 px-6 bg-white">
//       <div className="text-center mb-16">
//         <h2 className="text-5xl font-bold text-black">{rail?.rail_name}</h2>
//       </div>

//       {/* ✅ NO DUPLICATE */}
//       <div
//         ref={railRef}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
//       >
//         {items.map((item: any, idx: number) => (
//           <div
//             key={idx}
//             onClick={() => openModal(idx)}
//             className="relative cursor-pointer rounded-lg overflow-hidden bg-zinc-900"
//           >
//             <img src={item.buttonImage} className="w-full h-72 object-cover" alt="" />
//           </div>
//         ))}
//       </div>

//       {modalOpen && activeCategory !== null && (
//         <div
//           ref={modalRef}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//         >
//           {/* overlay + blur */}
//           <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
//           <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-400/20" />

//           {/* close */}
//           <button
//             onClick={closeModal}
//             className="absolute top-6 right-6 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
//             aria-label="Close"
//           >
//             ✕
//           </button>

//           <ModalBody
//             category={items[activeCategory]}
//             activeIndex={activeIndex}
//             setActiveIndex={setActiveIndex}
//             modalRef={modalRef}
//           />
//         </div>
//       )}
//     </section>
//   );
// }

// /* ================= MODAL BODY (inside same file) ================= */

// function ModalBody({
//   category,
//   activeIndex,
//   setActiveIndex,
//   modalRef,
// }: any) {
//   // ⭐ flatten nested arrays safely
//   const images: string[] = (category?.images || []).flat();

//   // ✅ NEW: start with uniform aspect ratio; click => real aspect ratio
//   const [viewMode, setViewMode] = useState<"uniform" | "real">("uniform");
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const caption = category?.name || category?.title || category?.label || "";

//   // when image changes, reset to uniform view
//   useEffect(() => {
//     setViewMode("uniform");
//   }, [activeIndex]);

//   const next = () => {
//     if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
//   };

//   const prev = () => {
//     if (activeIndex > 0) setActiveIndex(activeIndex - 1);
//   };

//   // ESC close + arrow nav
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeIndex, images.length]);

//   // fullscreen change tracking
//   useEffect(() => {
//     const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", onFsChange);
//     return () => document.removeEventListener("fullscreenchange", onFsChange);
//   }, []);

//   // ✅ Behavior:
//   // 1st click => switch to real aspect ratio
//   // 2nd click (when already real) => fullscreen toggle
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
//     } catch {
//       // ignore
//     }
//   };

//   if (!images.length) return null;

//   const leftIdx = activeIndex - 1;
//   const rightIdx = activeIndex + 1;

//   return (
//     <div className="relative z-10 w-full max-w-5xl px-6">
//       <div className="flex items-center justify-center gap-6">
//         {/* left preview (always uniform aspect) */}
//         <div className="hidden sm:block w-[22%]">
//           {leftIdx >= 0 && (
//             <button
//               onClick={prev}
//               className="w-full rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition"
//               aria-label="Previous"
//             >
//               <div className="aspect-[4/3] w-full bg-black/30">
//                 <img
//                   src={images[leftIdx]}
//                   className="h-full w-full object-cover"
//                   alt=""
//                 />
//               </div>
//             </button>
//           )}
//         </div>

//         {/* center main */}
//         <div className="w-full sm:w-[56%]">
//           <button
//             onClick={handleMainClick}
//             className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black/30"
//             aria-label="Toggle aspect/fullscreen"
//             title={
//               viewMode === "uniform"
//                 ? "Click to view real aspect ratio"
//                 : "Click again for fullscreen"
//             }
//           >
//             {/* ✅ UNIFORM aspect ratio (same for all images) */}
//             {viewMode === "uniform" ? (
//               <div className="aspect-[4/3] w-full bg-black/20">
//                 <img
//                   src={images[activeIndex]}
//                   className="h-full w-full object-cover"
//                   alt=""
//                 />
//               </div>
//             ) : (
//               /* ✅ REAL aspect ratio */
//               <img
//                 src={images[activeIndex]}
//                 className={
//                   isFullscreen
//                     ? "w-full max-h-screen object-contain"
//                     : "w-full max-h-[75vh] object-contain"
//                 }
//                 alt=""
//               />
//             )}
//           </button>

//           {/* helper text */}
//           <div className="mt-2 text-center text-white/50 text-xs">
//             {viewMode === "uniform"
//               ? "Click image to view real aspect ratio"
//               : "Click again for fullscreen"}
//           </div>
//         </div>

//         {/* right preview (always uniform aspect) */}
//         <div className="hidden sm:block w-[22%]">
//           {rightIdx < images.length && (
//             <button
//               onClick={next}
//               className="w-full rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition"
//               aria-label="Next"
//             >
//               <div className="aspect-[4/3] w-full bg-black/30">
//                 <img
//                   src={images[rightIdx]}
//                   className="h-full w-full object-cover"
//                   alt=""
//                 />
//               </div>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* caption */}
//       {caption ? (
//         <div className="mt-4 text-center text-white/90 text-sm">{caption}</div>
//       ) : null}

//       {/* bottom arrows */}
//       <div className="mt-6 flex items-center justify-center gap-4">
//         <button
//           onClick={prev}
//           disabled={activeIndex === 0}
//           className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10 flex items-center justify-center"
//           aria-label="Previous image"
//         >
//           ‹
//         </button>

//         <button
//           onClick={next}
//           disabled={activeIndex === images.length - 1}
//           className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10 flex items-center justify-center"
//           aria-label="Next image"
//         >
//           ›
//         </button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useRef, useEffect } from "react";

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
//     <section id="work-section" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#f8f8f8]">
//       <div className="text-center mb-10 sm:mb-14 md:mb-16">
//         <div className="w-10 sm:w-12 md:w-16 h-1 bg-red-600 mx-auto mb-4 sm:mb-6"></div>
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111]">
//           {rail?.rail_name}
//         </h2>
//       </div>

//       {/* ✅ GRID: 2 items per line on mobile */}
//       <div
//         ref={railRef}
//         className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-10 max-w-7xl mx-auto"
//       >
//         {items.map((item: any, idx: number) => (
//           <div
//             key={idx}
//             onClick={() => openModal(idx)}
//             className="group cursor-pointer rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
//           >
//             <img
//               src={item.buttonImage}
//               className="w-full h-40 sm:h-56 md:h-72 object-cover transition duration-700 group-hover:scale-105"
//               alt=""
//             />
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {modalOpen && activeCategory !== null && (
//         <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center">
//           <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
//           <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-400/20" />

//           <button
//             onClick={closeModal}
//             className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 h-10 w-10 rounded-full bg-white/30 text-white hover:bg-white/40 flex items-center justify-center"
//             aria-label="Close"
//           >
//             ✕
//           </button>

//           <ModalBody
//             category={items[activeCategory]}
//             activeIndex={activeIndex}
//             setActiveIndex={setActiveIndex}
//             modalRef={modalRef}
//           />
//         </div>
//       )}
//     </section>
//   );
// }

// function ModalBody({ category, activeIndex, setActiveIndex, modalRef }: any) {
//   const images: string[] = (category?.images || []).flat();
//   const [viewMode, setViewMode] = useState<"uniform" | "real">("uniform");
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const caption = category?.name || category?.title || category?.label || "";

//   useEffect(() => {
//     setViewMode("uniform");
//   }, [activeIndex]);

//   const next = () => {
//     if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
//   };
//   const prev = () => {
//     if (activeIndex > 0) setActiveIndex(activeIndex - 1);
//   };

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [activeIndex, images.length]);

//   useEffect(() => {
//     const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", onFsChange);
//     return () => document.removeEventListener("fullscreenchange", onFsChange);
//   }, []);

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

//   if (!images.length) return null;

//   const leftIdx = activeIndex - 1;
//   const rightIdx = activeIndex + 1;

//   return (
//     <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6">
//       <div className="flex items-center justify-center gap-4 sm:gap-6">
//         {/* LEFT */}
//         <div className="hidden sm:block w-[22%]">
//           {leftIdx >= 0 && (
//             <button
//               onClick={prev}
//               className="w-full rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition"
//             >
//               <div className="aspect-[4/3] w-full bg-black/20">
//                 <img src={images[leftIdx]} className="h-full w-full object-cover" alt="" />
//               </div>
//             </button>
//           )}
//         </div>

//         {/* CENTER */}
//         <div className="w-full sm:w-[56%]">
//           <button
//             onClick={handleMainClick}
//             className="w-full rounded-2xl overflow-hidden shadow-2xl bg-white/10"
//             title={viewMode === "uniform" ? "Click to view real aspect" : "Click again for fullscreen"}
//           >
//             {viewMode === "uniform" ? (
//               <div className="aspect-[4/3] w-full bg-black/10">
//                 <img src={images[activeIndex]} className="h-full w-full object-cover" alt="" />
//               </div>
//             ) : (
//               <img
//                 src={images[activeIndex]}
//                 className={isFullscreen ? "w-full max-h-screen object-contain" : "w-full max-h-[75vh] object-contain"}
//                 alt=""
//               />
//             )}
//           </button>

//           <div className="mt-2 text-center text-white/70 text-xs">
//             {viewMode === "uniform" ? "Click image to view real aspect ratio" : "Click again for fullscreen"}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="hidden sm:block w-[22%]">
//           {rightIdx < images.length && (
//             <button
//               onClick={next}
//               className="w-full rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition"
//             >
//               <div className="aspect-[4/3] w-full bg-black/20">
//                 <img src={images[rightIdx]} className="h-full w-full object-cover" alt="" />
//               </div>
//             </button>
//           )}
//         </div>
//       </div>

//       {caption && (
//         <div className="mt-4 text-center text-white text-sm font-medium">{caption}</div>
//       )}

//       <div className="mt-6 flex items-center justify-center gap-4">
//         <button
//           onClick={prev}
//           disabled={activeIndex === 0}
//           className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 disabled:opacity-40 flex items-center justify-center"
//         >
//           ‹
//         </button>
//         <button
//           onClick={next}
//           disabled={activeIndex === images.length - 1}
//           className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 disabled:opacity-40 flex items-center justify-center"
//         >
//           ›
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";

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

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#f8f8f8]">
      <div className="text-center mb-10 sm:mb-14 md:mb-16">
        <div className="w-10 sm:w-12 md:w-16 h-1 bg-red-600 mx-auto mb-4 sm:mb-6"></div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111]">
          {rail?.rail_name}
        </h2>
      </div>

      {/* GRID (2 per row on mobile) */}
      <div
        ref={railRef}
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-10 max-w-7xl mx-auto"
      >
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            onClick={() => openModal(idx)}
            className="group cursor-pointer rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
          >
            {/* IMAGE WRAPPER */}
            <div className="relative">
              <img
                src={item.buttonImage}
                className="w-full h-40 sm:h-56 md:h-72 object-cover transition duration-700 group-hover:scale-105"
                alt=""
              />

              {/* ✅ CINEMATIC GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* ✅ HEADING TEXT (like reference) */}
              {item.heading && (
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold tracking-wide uppercase leading-snug text-xs sm:text-sm md:text-base drop-shadow">
                    {item.heading}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && activeCategory !== null && (
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
          <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-400/20" />

          <button
            onClick={closeModal}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 h-10 w-10 rounded-full bg-white/30 text-white hover:bg-white/40 flex items-center justify-center"
            aria-label="Close"
          >
            ✕
          </button>

          <ModalBody
            category={items[activeCategory]}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            modalRef={modalRef}
          />
        </div>
      )}
    </section>
  );
}

function ModalBody({ category, activeIndex, setActiveIndex, modalRef }: any) {
  const images: string[] = (category?.images || []).flat();
  const [viewMode, setViewMode] = useState<"uniform" | "real">("uniform");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const caption = category?.name || category?.title || category?.label || "";

  useEffect(() => {
    setViewMode("uniform");
  }, [activeIndex]);

  const next = () => {
    if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
  };
  const prev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, images.length]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const handleMainClick = async () => {
    if (viewMode === "uniform") {
      setViewMode("real");
      return;
    }
    try {
      if (!document.fullscreenElement) {
        await modalRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {}
  };

  if (!images.length) return null;

  const leftIdx = activeIndex - 1;
  const rightIdx = activeIndex + 1;

  return (
    <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6">
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <div className="hidden sm:block w-[22%]">
          {leftIdx >= 0 && (
            <button
              onClick={prev}
              className="w-full rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition"
            >
              <div className="aspect-[4/3] w-full bg-black/20">
                <img src={images[leftIdx]} className="h-full w-full object-cover" alt="" />
              </div>
            </button>
          )}
        </div>

        <div className="w-full sm:w-[56%]">
          <button
            onClick={handleMainClick}
            className="w-full rounded-2xl overflow-hidden shadow-2xl bg-white/10"
            title={viewMode === "uniform" ? "Click to view real aspect" : "Click again for fullscreen"}
          >
            {viewMode === "uniform" ? (
              <div className="aspect-[4/3] w-full bg-black/10">
                <img src={images[activeIndex]} className="h-full w-full object-cover" alt="" />
              </div>
            ) : (
              <img
                src={images[activeIndex]}
                className={isFullscreen ? "w-full max-h-screen object-contain" : "w-full max-h-[75vh] object-contain"}
                alt=""
              />
            )}
          </button>

          <div className="mt-2 text-center text-white/70 text-xs">
            {viewMode === "uniform" ? "Click image to view real aspect ratio" : "Click again for fullscreen"}
          </div>
        </div>

        <div className="hidden sm:block w-[22%]">
          {rightIdx < images.length && (
            <button
              onClick={next}
              className="w-full rounded-2xl overflow-hidden opacity-70 hover:opacity-100 transition"
            >
              <div className="aspect-[4/3] w-full bg-black/20">
                <img src={images[rightIdx]} className="h-full w-full object-cover" alt="" />
              </div>
            </button>
          )}
        </div>
      </div>

      {caption && (
        <div className="mt-4 text-center text-white text-sm font-medium">{caption}</div>
      )}

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 disabled:opacity-40 flex items-center justify-center"
        >
          ‹
        </button>
        <button
          onClick={next}
          disabled={activeIndex === images.length - 1}
          className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 disabled:opacity-40 flex items-center justify-center"
        >
          ›
        </button>
      </div>
    </div>
  );
}
