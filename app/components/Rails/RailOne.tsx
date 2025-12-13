"use client";

import { useRef, useState, useEffect } from "react";

export default function RailOne({ rail }) {
  return (
    <section className="p-0">
      {rail.rail_items?.map((item, idx) => (
        <BackgroundVideo key={idx} item={item} />
      ))}
    </section>
  );
}

function BackgroundVideo({ item }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    v.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-black">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={item.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

      {/* RED ACCENT GLOW (optional subtle effect) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-transparent pointer-events-none" />

      {/* SOUND BUTTON */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-gray-700/50 text-white px-6 py-3 rounded-md shadow-2xl text-sm font-medium hover:bg-red-600 hover:border-red-600 transition-all duration-300 flex items-center gap-2"
      >
        {muted ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
            MUTED
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            UNMUTED
          </>
        )}
      </button>

      {/* CONTENT SECTION */}
      {item.heading && (
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="max-w-4xl">
            {/* Red accent line */}
            {/* <div className="w-16 h-1 bg-red-600 mb-6"></div> */}
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
              {item.heading}
            </h2>

            {item.subheading && (
              <p className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                {item.subheading}
              </p>
            )}

            {/* Optional CTA Button */}
            {/* <div className="mt-8 flex gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-red-600/50">
                Watch Now
              </button>
              <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 border border-white/20">
                Learn More
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}