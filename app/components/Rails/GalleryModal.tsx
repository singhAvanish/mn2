"use client";

import { useState, useRef, useEffect } from "react";

export default function GalleryModal({ category, onClose }) {
  const images = category.images || [];
  const [index, setIndex] = useState(0);

  const close = () => {
    document.body.style.overflow = "auto";
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4 backdrop-blur-xl">

      {/* Close */}
      <button
        onClick={close}
        className="absolute top-6 right-6 text-white text-3xl bg-white/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition"
      >
        ✕
      </button>

      {/* Main Image */}
      <div className="flex flex-col items-center max-w-4xl w-full">
        <img
          src={images[index]}
          className="max-h-[70vh] object-contain rounded-xl shadow-2xl shadow-purple-500/40"
        />

        <div className="flex gap-8 mt-6">
          <button
            onClick={() => index > 0 && setIndex(index - 1)}
            className="w-12 h-12 bg-purple-500 text-black rounded-full text-2xl font-bold hover:scale-110 transition"
          >
            ←
          </button>
          <button
            onClick={() =>
              index < images.length - 1 && setIndex(index + 1)
            }
            className="w-12 h-12 bg-purple-500 text-black rounded-full text-2xl font-bold hover:scale-110 transition"
          >
            →
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-6 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setIndex(i)}
              className={`w-20 h-16 object-cover rounded-md cursor-pointer ${
                index === i ? "ring-2 ring-purple-400" : "opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
