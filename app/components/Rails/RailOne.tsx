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
    <div className="relative w-full h-[85vh] overflow-hidden bg-[#1d130f]">
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

      {/* WARM BROWN OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a120e] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2c1c14]/50 to-transparent" />

      {/* SOUND BUTTON */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 bg-[#e8d5c4]/80 text-[#3a271c] px-5 py-3 rounded-full shadow-xl backdrop-blur-md text-sm font-semibold hover:bg-[#e8d5c4] transition"
      >
        {muted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
      </button>

      {/* HEADING */}
      {item.heading && (
        <div className="absolute bottom-10 left-8 max-w-3xl text-[#f6efe7]">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl">
            {item.heading}
          </h2>

          {item.subheading && (
            <p className="mt-4 text-lg md:text-xl text-[#f6efe7]/80">
              {item.subheading}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
