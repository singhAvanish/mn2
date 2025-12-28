


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

//       {/* GRID (2 per row on mobile) */}
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
//             {/* IMAGE WRAPPER */}
//             <div className="relative">
//               <img
//                 src={item.buttonImage}
//                 className="w-full h-40 sm:h-56 md:h-72 object-cover transition duration-700 group-hover:scale-105"
//                 alt=""
//               />

//               {/* ✅ CINEMATIC GRADIENT OVERLAY */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

//               {/* ✅ HEADING TEXT (like reference) */}
//               {item.heading && (
//                 <div className="absolute bottom-3 left-3 right-3">
//                   <p className="text-white font-semibold tracking-wide uppercase leading-snug text-xs sm:text-sm md:text-base drop-shadow">
//                     {item.heading}
//                   </p>
//                 </div>
//               )}
//             </div>
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

  return (
    <section
      id="work-section"
      className="
        relative py-16 sm:py-20 md:py-24 px-4 sm:px-6
        bg-gradient-to-b from-zinc-50 via-zinc-50 to-white
        overflow-hidden
      "
    >
      {/* soft background accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-black/[0.035] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-[520px] w-[520px] rounded-full bg-black/[0.03] blur-3xl" />

      <div className="text-center mb-10 sm:mb-14 md:mb-16 relative z-10">
        <div className="mx-auto mb-4 sm:mb-6 h-[3px] w-10 sm:w-12 md:w-16 rounded-full bg-gradient-to-r from-red-600 to-red-400" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950">
          {rail?.rail_name}
        </h2>
      </div>

      {/* GRID (2 per row on mobile) */}
      <div
        ref={railRef}
        className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-10 max-w-7xl mx-auto"
      >
        {items.map((item: any, idx: number) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => openModal(idx)}
            className="
              group cursor-pointer rounded-2xl overflow-hidden
              bg-white shadow-[0_14px_40px_rgba(0,0,0,0.10)]
              border border-zinc-200/70
              hover:shadow-[0_22px_60px_rgba(0,0,0,0.14)]
              transition
            "
          >
            {/* IMAGE WRAPPER */}
            <div className="relative">
              <img
                src={item.buttonImage}
                className="
                  w-full h-40 sm:h-56 md:h-72 object-cover
                  transition duration-700
                  group-hover:scale-[1.06]
                "
                alt=""
              />

              {/* overlay stack */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_55%)]" />

              {/* heading */}
              {item.heading && (
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold tracking-wide uppercase leading-snug text-xs sm:text-sm md:text-base drop-shadow">
                    {item.heading}
                  </p>
                  <div className="mt-2 h-[2px] w-10 rounded-full bg-white/60 opacity-80" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
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
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-400/10" />

            {/* close */}
            <motion.button
              onClick={closeModal}
              className="
                absolute top-4 sm:top-6 right-4 sm:right-6 z-10
                h-11 w-11 rounded-full
                border border-white/15
                bg-white/10 backdrop-blur-xl
                text-white hover:bg-white/15
                shadow-[0_14px_40px_rgba(0,0,0,0.35)]
                flex items-center justify-center
                transition
              "
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Close"
            >
              ✕
            </motion.button>

            {/* body */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative z-10 w-full"
            >
              <ModalBody
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

  return (
    <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 mx-auto">
      {/* panel */}
      <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.45)] p-4 sm:p-6">
        {/* header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="text-white/90">
            <div className="text-sm font-medium tracking-tight">{caption || "Gallery"}</div>
            <div className="text-xs text-white/60 mt-1">
              {viewMode === "uniform"
                ? "Click main image to expand"
                : "Click again for fullscreen"}
            </div>
          </div>

          <div className="text-xs text-white/70">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* ✅ MOBILE-STYLE LAYOUT ON ALL SCREENS */}
        <div className="flex flex-col items-center">
          {/* MAIN IMAGE: smaller by default, bigger after click */}
          <button
            onClick={handleMainClick}
            className="
              rounded-2xl overflow-hidden
              border border-white/10
              shadow-[0_18px_60px_rgba(0,0,0,0.55)]
              bg-black/15
              focus:outline-none focus:ring-2 focus:ring-white/30
              transition
              w-full
            "
            style={{
              maxWidth: viewMode === "uniform" ? 520 : 980,
            }}
            title={viewMode === "uniform" ? "Click to expand" : "Click again for fullscreen"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${viewMode}`}
                initial={{ opacity: 0, scale: 0.98, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.985, y: -6, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
              >
                {viewMode === "uniform" ? (
                  <div className="aspect-[4/3] w-full bg-black/10">
                    <img src={images[activeIndex]} className="h-full w-full object-cover" alt="" />
                  </div>
                ) : (
                  <img
                    src={images[activeIndex]}
                    className={
                      isFullscreen
                        ? "w-full max-h-screen object-contain"
                        : "w-full max-h-[78vh] object-contain"
                    }
                    alt=""
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* helper text */}
          <div className="mt-3 text-center text-white/60 text-xs">
            {viewMode === "uniform" ? "Click image to expand" : "Click again for fullscreen"}
          </div>

          {/* thumbnail strip */}
          <div className="mt-4 w-full" style={{ maxWidth: 980 }}>
            <div className="overflow-x-auto">
              <div className="flex gap-2 px-1 pb-1">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActiveIndex(i)}
                    className={`shrink-0 rounded-xl overflow-hidden border transition ${
                      i === activeIndex
                        ? "border-white/60 opacity-100"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                    style={{ width: 78, height: 58 }}
                    aria-label={`Open image ${i + 1}`}
                  >
                    <img src={src} className="h-full w-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* nav buttons */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="
                h-11 w-11 rounded-full
                border border-white/15
                bg-white/10 backdrop-blur-xl
                text-white hover:bg-white/15
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center justify-center
                transition
              "
            >
              ‹
            </button>

            <button
              onClick={next}
              disabled={activeIndex === images.length - 1}
              className="
                h-11 w-11 rounded-full
                border border-white/15
                bg-white/10 backdrop-blur-xl
                text-white hover:bg-white/15
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center justify-center
                transition
              "
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
