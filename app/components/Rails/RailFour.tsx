// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";

// export default function RailFour({ rail }: any) {
//   const items = rail?.rail_items || [];

//   const [index, setIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [viewMode, setViewMode] = useState<"uniform" | "real">("uniform");

//   const modalRef = useRef<HTMLDivElement | null>(null);
//   const touchStartX = useRef<number | null>(null);

//   const activeProject = activeProjectIndex !== null ? items[activeProjectIndex] : null;

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 1024);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
//   const next = () => setIndex((i) => (i + 1) % items.length);

//   const openProject = (idx: number) => {
//     setActiveProjectIndex(idx);
//     setActiveImageIndex(0);
//     setViewMode("uniform");
//     document.body.style.overflow = "hidden";
//   };

//   const closeProject = () => {
//     setActiveProjectIndex(null);
//     document.body.style.overflow = "auto";
//     if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
//   };

//   // swipe
//   const onTouchStart = (e: any) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const onTouchEnd = (e: any) => {
//     if (touchStartX.current == null) return;
//     const diff = e.changedTouches[0].clientX - touchStartX.current;
//     if (diff > 50) prev();
//     if (diff < -50) next();
//     touchStartX.current = null;
//   };

//   // positions like Rail3
//   const posOf = (i: number) => {
//     if (i === index) return "center";
//     if (i === (index - 1 + items.length) % items.length) return "left";
//     if (i === (index + 1) % items.length) return "right";
//     return "hidden";
//   };

//   // ESC close modal
//   useEffect(() => {
//     if (!activeProject) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") closeProject();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeProject]);

//   return (
//     <section className="py-24 bg-[#f8f8f8] px-6">
//       {/* Heading */}
//       <div className="text-center mb-16">
//         <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
//         <h2 className="text-4xl md:text-5xl font-bold text-[#111]">
//           {rail?.rail_name || "Upcoming Projects"}
//         </h2>
//         <p className="mt-4 text-gray-600 text-lg">
//           Explore our selected works and upcoming productions
//         </p>
//       </div>

//       {/* Carousel wrapper */}
//       <div className="relative max-w-6xl mx-auto">
//         {/* Desktop arrows only */}
//         {!isMobile && items.length > 1 && (
//           <>
//             <button
//               onClick={prev}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition"
//               aria-label="Previous"
//             >
//               ‹
//             </button>

//             <button
//               onClick={next}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition"
//               aria-label="Next"
//             >
//               ›
//             </button>
//           </>
//         )}

//         <div
//           className="relative h-[420px] sm:h-[460px] flex items-center justify-center overflow-hidden"
//           onTouchStart={onTouchStart}
//           onTouchEnd={onTouchEnd}
//         >
//           {items.map((item: any, i: number) => {
//             const pos = posOf(i);
//             const isCenter = pos === "center";

//             return (
//               <button
//                 key={i}
//                 onClick={() => openProject(i)}
//                 className="absolute transition-all duration-700 ease-out"
//                 style={{
//                   opacity: pos === "hidden" ? 0 : isCenter ? 1 : 0.55,
//                   zIndex: isCenter ? 30 : 10,
//                   transform: isMobile
//                     ? `translateX(${110 * (i - index)}%) scale(${isCenter ? 1 : 0.86})`
//                     : pos === "center"
//                     ? "translateX(0) scale(1.06)"
//                     : pos === "left"
//                     ? "translateX(-60%) scale(0.86)"
//                     : pos === "right"
//                     ? "translateX(60%) scale(0.86)"
//                     : "scale(0)",
//                 }}
//               >
//                 {/* Card */}
//                 <div
//                   className={`group w-[300px] sm:w-[340px] rounded-2xl overflow-hidden bg-white border shadow-xl transition ${
//                     isCenter
//                       ? "border-red-600 shadow-red-600/10"
//                       : "border-black/10"
//                   }`}
//                 >
//                   {/* Square image */}
//                   <div className="relative aspect-square overflow-hidden">
//                     <img
//                       src={item.coverImage}
//                       alt={item.projectName}
//                       className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//                     />

//                     {/* Different touch vs rail3: corner badge + film grain look */}
//                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.15),transparent_55%)]" />
//                     <div className="absolute top-4 left-4 text-xs font-semibold tracking-widest uppercase text-white bg-black/40 backdrop-blur px-3 py-1 rounded-full">
//                       Upcoming
//                     </div>

//                     {/* Bottom cinematic title */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
//                     <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4">
//                       <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
//                         {item.projectName}
//                       </h3>
//                       <span className="text-white/85 text-sm font-medium">
//                         View →
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center gap-2 mt-10">
//           {items.map((_: any, i: number) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 i === index ? "bg-red-600 w-8" : "bg-black/20 w-2 hover:bg-black/30"
//               }`}
//               aria-label={`Go to project ${i + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {activeProject && (
//         <div
//           ref={modalRef}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//         >
//           <div className="absolute inset-0 bg-black/75" onClick={closeProject} />
//           <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-400/10" />

//           <button
//             onClick={closeProject}
//             className="absolute top-6 right-6 z-10 h-11 w-11 rounded-full bg-white/15 text-white hover:bg-white/25 flex items-center justify-center"
//             aria-label="Close"
//           >
//             ✕
//           </button>

//           <ProjectModal
//             project={activeProject}
//             activeIndex={activeImageIndex}
//             setActiveIndex={setActiveImageIndex}
//             modalRef={modalRef}
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//           />
//         </div>
//       )}
//     </section>
//   );
// }

// /* ================= Modal Gallery ================= */

// function ProjectModal({
//   project,
//   activeIndex,
//   setActiveIndex,
//   modalRef,
//   viewMode,
//   setViewMode,
// }: any) {
//   const images: string[] = useMemo(() => (project?.images || []).flat(), [project]);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   useEffect(() => {
//     const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", onFsChange);
//     return () => document.removeEventListener("fullscreenchange", onFsChange);
//   }, []);

//   const next = () => {
//     if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
//   };
//   const prev = () => {
//     if (activeIndex > 0) setActiveIndex(activeIndex - 1);
//   };

//   // 1 click => real aspect, next click => fullscreen
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

//   if (!images.length) {
//     return (
//       <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
//         <h3 className="text-3xl font-bold">{project?.projectName}</h3>
//         <p className="mt-4 text-white/70">No images found for this project.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative z-10 w-full max-w-6xl px-6">
//       <div className="text-center mb-8">
//         <h3 className="text-3xl md:text-4xl font-bold text-white">
//           {project?.projectName}
//         </h3>
//         {project?.description ? (
//           <p className="mt-3 text-white/75 max-w-3xl mx-auto text-sm md:text-base">
//             {project.description}
//           </p>
//         ) : null}
//       </div>

//       <div className="flex items-center justify-center gap-6">
//         {/* Desktop arrows */}
//         <button
//           onClick={prev}
//           disabled={activeIndex === 0}
//           className="hidden sm:flex h-12 w-12 rounded-full bg-white/15 text-white hover:bg-white/25 disabled:opacity-40 items-center justify-center"
//         >
//           ‹
//         </button>

//         {/* Main */}
//         <button
//           onClick={handleMainClick}
//           className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white/10"
//           title={viewMode === "uniform" ? "Click to show full aspect gallery" : "Click again for fullscreen"}
//         >
//           {viewMode === "uniform" ? (
//             <div className="aspect-square w-full bg-black/25">
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
//                   ? "w-full max-h-screen object-contain"
//                   : "w-full max-h-[75vh] object-contain"
//               }
//               alt=""
//             />
//           )}
//         </button>

//         <button
//           onClick={next}
//           disabled={activeIndex === images.length - 1}
//           className="hidden sm:flex h-12 w-12 rounded-full bg-white/15 text-white hover:bg-white/25 disabled:opacity-40 items-center justify-center"
//         >
//           ›
//         </button>
//       </div>

//       {/* Mobile arrows + counter */}
//       <div className="mt-6 flex items-center justify-center gap-4 text-white/70 text-sm">
//         <button
//           onClick={prev}
//           disabled={activeIndex === 0}
//           className="sm:hidden h-11 w-11 rounded-full bg-white/15 text-white hover:bg-white/25 disabled:opacity-40 flex items-center justify-center"
//         >
//           ‹
//         </button>

//         <span>
//           {activeIndex + 1} / {images.length}
//         </span>

//         <button
//           onClick={next}
//           disabled={activeIndex === images.length - 1}
//           className="sm:hidden h-11 w-11 rounded-full bg-white/15 text-white hover:bg-white/25 disabled:opacity-40 flex items-center justify-center"
//         >
//           ›
//         </button>
//       </div>

//       <div className="mt-3 text-center text-white/50 text-xs">
//         {viewMode === "uniform"
//           ? "Tap image once to open full-aspect gallery"
//           : "Tap again for fullscreen"}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function RailFour({ rail }: any) {
  const items = Array.isArray(rail?.rail_items) ? rail.rail_items : [];
  const n = items.length;

  // ✅ keep direction consistent (always same slide direction)
  const [virtualIndex, setVirtualIndex] = useState(0);
  const index = n ? ((virtualIndex % n) + n) % n : 0;

  const [isMobile, setIsMobile] = useState(false);

  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"uniform" | "real">("uniform");

  const modalRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const activeProject = activeProjectIndex !== null ? items[activeProjectIndex] : null;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // keep virtualIndex valid when data changes
  useEffect(() => {
    if (!n) return;
    setVirtualIndex((v) => ((v % n) + n) % n);
  }, [n]);

  // ✅ Always move forward (so direction stays same)
  const next = () => {
    if (n <= 1) return;
    setVirtualIndex((v) => v + 1);
  };

  // ✅ "prev" but still forward (so it animates same direction)
  const prev = () => {
    if (n <= 1) return;
    setVirtualIndex((v) => v + (n - 1));
  };

  const openProject = (idx: number) => {
    setActiveProjectIndex(idx);
    setActiveImageIndex(0);
    setViewMode("uniform");
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setActiveProjectIndex(null);
    document.body.style.overflow = "auto";
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  };

  // ✅ mobile-safe circular offset to prevent "teleport" at wrap
  const circularOffset = (i: number, current: number) => {
    if (!n) return 0;
    const diff = i - current;
    let normalized = ((diff % n) + n) % n; // 0..n-1
    if (normalized > n / 2) normalized -= n; // -n/2..n/2
    return normalized;
  };

  // swipe
  const onTouchStart = (e: any) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: any) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? touchStartX.current;
    const diff = endX - touchStartX.current;

    if (diff > 50) prev();
    if (diff < -50) next();

    touchStartX.current = null;
  };

  // positions like Rail3 (desktop)
  const posOf = (i: number) => {
    if (!n) return "hidden";
    if (i === index) return "center";
    if (i === (index - 1 + n) % n) return "left";
    if (i === (index + 1) % n) return "right";
    return "hidden";
  };

  // ESC close modal
  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  if (!n) return null;

  return (
    <section className="py-24 bg-[#f8f8f8] px-4 sm:px-6">
      {/* Heading */}
      <div className="text-center mb-16">
        <div className="w-16 h-1 bg-red-600 mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold text-[#111]">
          {rail?.rail_name || "Upcoming Projects"}
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Explore our selected works and upcoming productions
        </p>
      </div>

      {/* Carousel wrapper */}
      <div className="relative max-w-6xl mx-auto">
        {/* ✅ Desktop arrows ABOVE cards (fix: arrows were behind center card) */}
        {!isMobile && n > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation(); // ✅ prevent opening project under arrow
                prev();
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-[60] h-12 w-12 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition pointer-events-auto"
              aria-label="Previous"
              type="button"
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation(); // ✅ prevent opening project under arrow
                next();
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-[60] h-12 w-12 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition pointer-events-auto"
              aria-label="Next"
              type="button"
            >
              ›
            </button>
          </>
        )}

        <div
          className="relative h-[420px] sm:h-[460px] flex items-center justify-center overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {items.map((item: any, i: number) => {
            const pos = posOf(i);
            const isCenter = pos === "center";
            const mobileOffset = circularOffset(i, index);

            return (
              <button
                key={i}
                onClick={() => openProject(i)}
                type="button"
                className="absolute transition-all duration-700 ease-out"
                style={{
                  opacity: pos === "hidden" ? 0 : isCenter ? 1 : 0.55,
                  zIndex: isCenter ? 30 : 10,
                  transform: isMobile
                    ? `translateX(${110 * mobileOffset}%) scale(${isCenter ? 1 : 0.86})`
                    : pos === "center"
                    ? "translateX(0) scale(1.06)"
                    : pos === "left"
                    ? "translateX(-60%) scale(0.86)"
                    : pos === "right"
                    ? "translateX(60%) scale(0.86)"
                    : "scale(0)",
                }}
              >
                {/* Card */}
                <div
                  className={`group w-[280px] sm:w-[320px] md:w-[340px] rounded-2xl overflow-hidden bg-white border shadow-xl transition ${
                    isCenter ? "border-red-600 shadow-red-600/10" : "border-black/10"
                  }`}
                >
                  {/* Square image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.projectName}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* Different touch vs rail3 */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.15),transparent_55%)]" />
                    <div className="absolute top-4 left-4 text-xs font-semibold tracking-widest uppercase text-white bg-black/40 backdrop-blur px-3 py-1 rounded-full">
                      Upcoming
                    </div>

                    {/* Bottom title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                        {item.projectName}
                      </h3>
                      <span className="text-white/85 text-sm font-medium">View →</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {items.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setVirtualIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-red-600 w-8" : "bg-black/20 w-2 hover:bg-black/30"
              }`}
              aria-label={`Go to project ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/75" onClick={closeProject} />
          <div className="absolute inset-0 backdrop-blur-2xl bg-zinc-400/10" />

          <button
            onClick={closeProject}
            className="absolute top-6 right-6 z-10 h-11 w-11 rounded-full bg-white/15 text-white hover:bg-white/25 flex items-center justify-center"
            aria-label="Close"
            type="button"
          >
            ✕
          </button>

          <ProjectModal
            project={activeProject}
            activeIndex={activeImageIndex}
            setActiveIndex={setActiveImageIndex}
            modalRef={modalRef}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      )}
    </section>
  );
}

/* ================= Modal Gallery ================= */

function ProjectModal({
  project,
  activeIndex,
  setActiveIndex,
  modalRef,
  viewMode,
  setViewMode,
}: any) {
  const images: string[] = useMemo(() => (project?.images || []).flat(), [project]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const next = () => {
    if (!images.length) return;
    setActiveIndex((i: number) => (i + 1) % images.length);
  };
  const prev = () => {
    if (!images.length) return;
    setActiveIndex((i: number) => (i - 1 + images.length) % images.length);
  };

  // 1 click => real aspect, next click => fullscreen
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

  if (!images.length) {
    return (
      <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
        <h3 className="text-3xl font-bold">{project?.projectName}</h3>
        <p className="mt-4 text-white/70">No images found for this project.</p>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-6xl px-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-bold text-white">
          {project?.projectName}
        </h3>
        {project?.description ? (
          <p className="mt-3 text-white/75 max-w-3xl mx-auto text-sm md:text-base">
            {project.description}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={prev}
          className="hidden sm:flex h-12 w-12 rounded-full bg-white/15 text-white hover:bg-white/25 items-center justify-center"
          type="button"
          aria-label="Previous image"
        >
          ‹
        </button>

        <button
          onClick={handleMainClick}
          className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white/10"
          title={viewMode === "uniform" ? "Click to show full aspect gallery" : "Click again for fullscreen"}
          type="button"
        >
          {viewMode === "uniform" ? (
            <div className="aspect-square w-full bg-black/25">
              <img
                src={images[activeIndex]}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
          ) : (
            <img
              src={images[activeIndex]}
              className={
                isFullscreen
                  ? "w-full max-h-screen object-contain"
                  : "w-full max-h-[75vh] object-contain"
              }
              alt=""
            />
          )}
        </button>

        <button
          onClick={next}
          className="hidden sm:flex h-12 w-12 rounded-full bg-white/15 text-white hover:bg-white/25 items-center justify-center"
          type="button"
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {/* Mobile arrows + counter */}
      <div className="mt-6 flex items-center justify-center gap-4 text-white/70 text-sm">
        <button
          onClick={prev}
          className="sm:hidden h-11 w-11 rounded-full bg-white/15 text-white hover:bg-white/25 flex items-center justify-center"
          type="button"
        >
          ‹
        </button>

        <span>
          {activeIndex + 1} / {images.length}
        </span>

        <button
          onClick={next}
          className="sm:hidden h-11 w-11 rounded-full bg-white/15 text-white hover:bg-white/25 flex items-center justify-center"
          type="button"
        >
          ›
        </button>
      </div>

      <div className="mt-3 text-center text-white/50 text-xs">
        {viewMode === "uniform"
          ? "Tap image once to open full-aspect gallery"
          : "Tap again for fullscreen"}
      </div>
    </div>
  );
}

