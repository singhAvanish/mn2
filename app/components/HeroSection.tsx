"use client";

import { useRef, useState, useEffect } from "react";

export default function HeroSection() {
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

  const handlePlayClick = () => {
    // You can add modal or fullscreen video logic here
    console.log("Play button clicked");
  };

  const handleGetStarted = () => {
    // Navigate to your signup/contact page
    console.log("Get Started clicked");
  };

  const handleShowPlan = () => {
    // Navigate to pricing/plans page
    console.log("Show Plan clicked");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Using a sample video - Replace with your own video URL */}
        {/* <source src="https://assets.mixkit.co/videos/preview/mixkit-film-production-team-recording-a-movie-scene-34536-large.mp4" type="video/mp4" /> */}
        <source src="/videos/bg.mp4" type="video/mp4" />

        {/* Alternative placeholder video */}
        <source src="https://cdn.coverr.co/videos/coverr-behind-the-scenes-of-a-film-set-5092/1080p.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
      <div className="absolute inset-0 bg-black/30" />

      {/* SOUND TOGGLE BUTTON - Top Right */}
      <button
        onClick={toggleMute}
        className="absolute top-24 right-8 bg-black/50 backdrop-blur-sm border border-gray-700/50 text-white px-5 py-2.5 rounded-md text-xs font-medium hover:bg-red-600 hover:border-red-600 transition-all duration-300 flex items-center gap-2 z-20"
      >
        {muted ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
            OFF
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            ON
          </>
        )}
      </button>

      {/* MAIN CONTENT */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8 md:px-12 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT COLUMN - TEXT CONTENT */}
            <div className="space-y-8 max-w-2xl">
              
              {/* WELCOME LABEL */}
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-base md:text-lg font-light tracking-wide">
                  Welcome
                </span>
                <div className="h-px bg-gray-500 flex-1 max-w-[200px]"></div>
              </div>

              {/* MAIN HEADING */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                LET'S MAKE YOUR
                <br />
                FILM + TVS SHOWS
                <br />
                & MORE
              </h1>

              {/* SUBHEADING */}
              <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>

              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={handleShowPlan}
                  className="border-2 border-red-600 text-red-600 px-8 py-3.5 rounded-md font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
                >
                  Show Plan
                </button>
                <button 
                  onClick={handleGetStarted}
                  className="bg-red-600 text-white px-8 py-3.5 rounded-md font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-600/50 text-sm uppercase tracking-wider"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN - PLAY BUTTON */}
            <div className="flex justify-center lg:justify-end items-center">
              <button 
                onClick={handlePlayClick}
                className="group flex flex-col items-center gap-6 hover:scale-105 transition-transform duration-300 focus:outline-none"
              >
                {/* PLAY BUTTON CIRCLE */}
                <div className="relative">
                  {/* Main Circle */}
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:shadow-red-600/80 transition-all duration-300 relative z-10">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  
                  {/* PULSING RING ANIMATIONS */}
                  <div className="absolute inset-0 rounded-full border-2 border-red-600 animate-ping opacity-30"></div>
                  <div className="absolute inset-0 rounded-full border border-red-600/50 scale-110 animate-pulse"></div>
                </div>

                {/* WATCHING NOW LABEL */}
                <div className="text-center">
                  <div className="h-px bg-white w-20 md:w-24 mx-auto mb-2"></div>
                  <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                    Watching Now
                  </span>
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR (Optional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white text-xs uppercase tracking-widest">Scroll</span>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}