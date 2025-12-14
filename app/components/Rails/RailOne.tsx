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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Effect to initialize video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.playsInline = true;
    v.muted = true; // Start muted
    
    const playPromise = v.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Auto-play failed:", error);
          // Fallback: Try to play with user interaction
          const handleFirstInteraction = () => {
            v.play().catch(e => console.log("Play on interaction failed:", e));
            document.removeEventListener("click", handleFirstInteraction);
            document.removeEventListener("touchstart", handleFirstInteraction);
          };
          
          document.addEventListener("click", handleFirstInteraction);
          document.addEventListener("touchstart", handleFirstInteraction);
        });
    }
  }, []); // Empty dependency array - runs once on mount

  // Effect to handle mute changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    v.muted = muted;
    
    // If we're unmuting and video is paused, try to play
    if (!muted && v.paused) {
      v.play().catch(error => {
        console.log("Play after unmute failed:", error);
        // If play fails on unmute, re-mute
        v.muted = true;
        setMuted(true);
      });
    }
  }, [muted]); // Only re-run when muted changes

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-black">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={item.videoUrl}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

      {/* SOUND BUTTON */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-gray-700/50 text-white px-6 py-3 rounded-md shadow-2xl text-sm font-medium hover:bg-black/80 hover:border-gray-600 transition-all duration-300 flex items-center gap-2 z-10"
      >
        {muted ? (
          <>
            <span className="text-xl">🔇</span>
            <span>SOUND OFF</span>
          </>
        ) : (
          <>
            <span className="text-xl">🔊</span>
            <span>SOUND ON</span>
          </>
        )}
      </button>

      {/* CONTENT - Centered left text */}
      {(item.heading || item.subheading) && (
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl ml-8 md:ml-12 lg:ml-16 px-4">
            {item.heading && (
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
                {item.heading}
              </h2>
            )}

            {item.subheading && (
              <p className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                {item.subheading}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}