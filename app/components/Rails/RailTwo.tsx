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
    <section id="work-section" className="py-16 px-6 md:px-10 bg-[#f3e9dd]">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3d2b1f] drop-shadow">
          {rail.rail_name}
        </h2>
        <p className="mt-2 text-[#6d5b4d]">
          A curated collection of our finest cinematic work.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rail.rail_items?.map((item, idx) => (
          <div
            key={idx}
            onClick={() => openModal(idx)}
            className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg bg-[#1d130f] group"
          >
            <img
              src={item.buttonImage}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d130f] via-transparent to-transparent opacity-70 group-hover:opacity-50 transition" />

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 text-[#f6efe7] drop-shadow-lg">
              <h3 className="text-xl font-bold">{item.title || "Gallery"}</h3>
              <p className="text-sm text-[#f6efe7]/70">Tap to view →</p>
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
   GALLERY MODAL (Warm Brown + Cream Cinematic)
----------------------------------------------------------- */
function GalleryModal({ category, activeIndex, setActiveIndex, onClose }) {
  const images = category.images || [];
  const [touchStart, setTouchStart] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    setTimeout(() => setFade(true), 40);
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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-[#f6efe7] text-3xl bg-[#2b1d16]/70 w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#2b1d16]/90 transition"
        onClick={onClose}
      >
        ✕
      </button>

      {/* CONTENT */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* MAIN IMAGE */}
        <img
          src={images[activeIndex]}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`max-h-[70vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ${
            fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />

        {/* CAPTION */}
        <p className="text-[#f6efe7] text-lg mt-4">
          {activeIndex + 1} / {images.length}
        </p>

        {/* ARROWS */}
        <div className="flex gap-6 mt-6">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-12 h-12 bg-[#e8d5c4] text-[#3a271c] rounded-full text-2xl flex items-center justify-center disabled:opacity-40 shadow-lg"
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={activeIndex === images.length - 1}
            className="w-12 h-12 bg-[#e8d5c4] text-[#3a271c] rounded-full text-2xl flex items-center justify-center disabled:opacity-40 shadow-lg"
          >
            →
          </button>
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-3 mt-6 overflow-x-auto px-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActiveIndex(i)}
              className={`w-20 h-16 object-cover rounded-lg cursor-pointer transition ${
                i === activeIndex
                  ? "ring-2 ring-[#e8d5c4]"
                  : "opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
