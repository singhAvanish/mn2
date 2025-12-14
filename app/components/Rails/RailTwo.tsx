// "use client";

// import { useState, useRef, useEffect } from "react";

// export default function RailTwo({ rail }) {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);

//   const openModal = (idx) => {
//     setActiveCategory(idx);
//     setActiveIndex(0);
//     setModalOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setActiveCategory(null);
//     document.body.style.overflow = "auto";
//   };

//   return (
//     <section id="work-section" className="py-16 px-6 md:px-10 bg-[#f3e9dd]">
//       {/* Title */}
//       <div className="text-center mb-10">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-[#3d2b1f] drop-shadow">
//           {rail.rail_name}
//         </h2>
//         <p className="mt-2 text-[#6d5b4d]">
//           A curated collection of our finest cinematic work.
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {rail.rail_items?.map((item, idx) => (
//           <div
//             key={idx}
//             onClick={() => openModal(idx)}
//             className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg bg-[#1d130f] group"
//           >
//             <img
//               src={item.buttonImage}
//               className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
//             />

//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-[#1d130f] via-transparent to-transparent opacity-70 group-hover:opacity-50 transition" />

//             {/* Title Overlay */}
//             <div className="absolute bottom-4 left-4 text-[#f6efe7] drop-shadow-lg">
//               <h3 className="text-xl font-bold">{item.title || "Gallery"}</h3>
//               <p className="text-sm text-[#f6efe7]/70">Tap to view →</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {modalOpen && activeCategory !== null && (
//         <GalleryModal
//           category={rail.rail_items[activeCategory]}
//           activeIndex={activeIndex}
//           setActiveIndex={setActiveIndex}
//           onClose={closeModal}
//         />
//       )}
//     </section>
//   );
// }

// /* -----------------------------------------------------------
//    GALLERY MODAL (Warm Brown + Cream Cinematic)
// ----------------------------------------------------------- */
// function GalleryModal({ category, activeIndex, setActiveIndex, onClose }) {
//   const images = category.images || [];
//   const [touchStart, setTouchStart] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     setFade(false);
//     setTimeout(() => setFade(true), 40);
//   }, [activeIndex]);

//   const next = () => {
//     if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
//   };

//   const prev = () => {
//     if (activeIndex > 0) setActiveIndex(activeIndex - 1);
//   };

//   // Touch controls
//   const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);

//   const handleTouchEnd = (e) => {
//     const diff = e.changedTouches[0].clientX - touchStart;
//     if (diff > 50) prev();
//     if (diff < -50) next();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
//       {/* Close Button */}
//       <button
//         className="absolute top-6 right-6 text-[#f6efe7] text-3xl bg-[#2b1d16]/70 w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#2b1d16]/90 transition"
//         onClick={onClose}
//       >
//         ✕
//       </button>

//       {/* CONTENT */}
//       <div className="w-full max-w-4xl flex flex-col items-center">
//         {/* MAIN IMAGE */}
//         <img
//           src={images[activeIndex]}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//           className={`max-h-[70vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ${
//             fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
//           }`}
//         />

//         {/* CAPTION */}
//         <p className="text-[#f6efe7] text-lg mt-4">
//           {activeIndex + 1} / {images.length}
//         </p>

//         {/* ARROWS */}
//         <div className="flex gap-6 mt-6">
//           <button
//             onClick={prev}
//             disabled={activeIndex === 0}
//             className="w-12 h-12 bg-[#e8d5c4] text-[#3a271c] rounded-full text-2xl flex items-center justify-center disabled:opacity-40 shadow-lg"
//           >
//             ←
//           </button>
//           <button
//             onClick={next}
//             disabled={activeIndex === images.length - 1}
//             className="w-12 h-12 bg-[#e8d5c4] text-[#3a271c] rounded-full text-2xl flex items-center justify-center disabled:opacity-40 shadow-lg"
//           >
//             →
//           </button>
//         </div>

//         {/* THUMBNAILS */}
//         <div className="flex gap-3 mt-6 overflow-x-auto px-2">
//           {images.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               onClick={() => setActiveIndex(i)}
//               className={`w-20 h-16 object-cover rounded-lg cursor-pointer transition ${
//                 i === activeIndex
//                   ? "ring-2 ring-[#e8d5c4]"
//                   : "opacity-60 hover:opacity-100"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";

export default function RailTwo({ rail }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (idx) => {
    setActiveCategory(idx);
    setActiveIndex(0);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveCategory(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="work-section" className="py-20 px-6 md:px-10 lg:px-16 bg-black">
      {/* Title */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        {/* Red accent line */}
        <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {rail.rail_name}
        </h2>
        <p className="text-gray-400 text-lg">
          A curated collection of our finest cinematic work.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {rail.rail_items?.map((item, idx) => (
          <div
            key={idx}
            onClick={() => openModal(idx)}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-2xl bg-zinc-900 group border border-gray-800 hover:border-red-600 transition-all duration-300"
          >
            <img
              src={item.buttonImage}
              alt={item.title || "Gallery"}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

            {/* Red accent on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-transparent to-transparent group-hover:from-red-600/20 transition-all duration-300" />

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="w-12 h-0.5 bg-red-600 mb-3 group-hover:w-20 transition-all duration-300"></div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {item.title || "Gallery"}
              </h3>
              <div className="flex items-center gap-2 text-gray-300 group-hover:text-red-500 transition-colors">
                <span className="text-sm font-medium">View Project</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && activeCategory !== null && (
        <GalleryModal
          category={rail.rail_items[activeCategory]}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

/* -----------------------------------------------------------
   GALLERY MODAL (Dark Cinematic with Red Accents)
----------------------------------------------------------- */
function GalleryModal({ category, activeIndex, setActiveIndex, onClose }) {
  const images = category.images || [];
  const [touchStart, setTouchStart] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    setTimeout(() => setFade(true), 40);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const next = () => {
    if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
  };

  const prev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  // Touch controls
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) prev();
    if (diff < -50) next();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-white text-2xl bg-zinc-900/80 backdrop-blur-sm border border-gray-700 w-12 h-12 rounded-md flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 z-10"
        onClick={onClose}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Arrows - Desktop */}
      <button
        onClick={prev}
        disabled={activeIndex === 0}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-zinc-900/80 backdrop-blur-sm border border-gray-700 text-white rounded-md items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-600 hover:border-red-600 transition-all duration-300 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        disabled={activeIndex === images.length - 1}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-zinc-900/80 backdrop-blur-sm border border-gray-700 text-white rounded-md items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-600 hover:border-red-600 transition-all duration-300 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* CONTENT */}
      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* MAIN IMAGE */}
        <div className="relative w-full">
          <img
            src={images[activeIndex]}
            alt={`Gallery image ${activeIndex + 1}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`max-h-[70vh] w-full object-contain rounded-lg shadow-2xl transition-all duration-300 ${
              fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        </div>

        {/* CAPTION & COUNTER */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px bg-gray-600 w-12"></div>
          <p className="text-white text-lg font-medium">
            <span className="text-red-600">{activeIndex + 1}</span> / {images.length}
          </p>
          <div className="h-px bg-gray-600 w-12"></div>
        </div>

        {/* ARROWS - Mobile */}
        <div className="flex md:hidden gap-4 mt-6">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-12 h-12 bg-zinc-900 border border-gray-700 text-white rounded-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-600 hover:border-red-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={activeIndex === images.length - 1}
            className="w-12 h-12 bg-zinc-900 border border-gray-700 text-white rounded-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-600 hover:border-red-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-3 mt-8 overflow-x-auto px-2 pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent max-w-full">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`w-24 h-16 flex-shrink-0 object-cover rounded-md cursor-pointer transition-all duration-300 border-2 ${
                i === activeIndex
                  ? "border-red-600 opacity-100 scale-105"
                  : "border-gray-700 opacity-50 hover:opacity-100 hover:border-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 3px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}