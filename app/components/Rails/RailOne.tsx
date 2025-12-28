



// "use client";

// import { useRef, useState, useEffect } from "react";

// export default function RailOne({ rail }: any) {
//   return (
//     <section className="p-0">
//       {rail.rail_items?.map((item: any, idx: number) => (
//         <BackgroundVideo key={idx} item={item} />
//       ))}
//     </section>
//   );
// }

// function BackgroundVideo({ item }: any) {
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const [muted, setMuted] = useState(true);
//   const userToggledRef = useRef(false); // remembers user choice

//   // ✅ autoplay init
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;

//     v.playsInline = true;
//     v.muted = true;

//     const play = () => v.play().catch(() => {});

//     const playPromise = v.play();
//     if (playPromise !== undefined) {
//       playPromise.catch(() => {
//         const handleFirstInteraction = () => {
//           play();
//           document.removeEventListener("click", handleFirstInteraction);
//           document.removeEventListener("touchstart", handleFirstInteraction);
//         };
//         document.addEventListener("click", handleFirstInteraction);
//         document.addEventListener("touchstart", handleFirstInteraction);
//       });
//     }
//   }, []);

//   // ✅ sync muted state to video element
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     v.muted = muted;
//   }, [muted]);

//   // ✅ when rail is out of view: pause + force mute
//   // ✅ when rail comes back: play + restore mute state (if user had toggled)
//   useEffect(() => {
//     const el = wrapperRef.current;
//     const v = videoRef.current;
//     if (!el || !v) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];
//         const inView = entry.isIntersecting;

//         if (!inView) {
//           // leaving rail -> always mute + pause
//           v.muted = true;
//           setMuted(true);
//           v.pause();
//         } else {
//           // coming back -> play again
//           v.play().catch(() => {});
//           // if user had turned sound ON earlier, restore it
//           if (userToggledRef.current) {
//             v.muted = false;
//             setMuted(false);
//           }
//         }
//       },
//       {
//         threshold: 0.45, // consider "in view" when ~45% visible
//       }
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   const toggleMute = () => {
//     userToggledRef.current = true; // user decided
//     setMuted((p) => !p);

//     const v = videoRef.current;
//     if (!v) return;

//     // if unmuting, ensure video is playing
//     if (muted) {
//       v.play().catch(() => {});
//     }
//   };

//   return (
//     <div
//   ref={wrapperRef}
//   className="relative w-full h-[92vh] md:h-[85vh] overflow-hidden bg-black"
// >
//       {/* VIDEO */}
//     <video
//   ref={videoRef}
//   src={item.videoUrl}
//   autoPlay
//   loop
//   muted={muted}
//   playsInline
//   className="
//     absolute inset-0
//     w-full h-full
//     object-cover
//     scale-[1.12] sm:scale-100 md:scale-100
//   "
// />


//       {/* LIGHT CINEMATIC OVERLAY */}
//       <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
// <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30" />

     

//       {/* SOUND BUTTON */}
//       <button
//         onClick={toggleMute}
//         className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 bg-white/80 backdrop-blur-md border border-black/10 text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-md shadow-xl text-sm font-medium hover:bg-white transition z-10"
//       >
//         {muted ? "🔇 Sound Off" : "🔊 Sound On"}
//       </button>

//       {/* TEXT */}
//       {(item.heading || item.subheading) && (
//         <div className="absolute inset-0 flex items-center">
//           <div className="max-w-4xl ml-4 sm:ml-8 md:ml-12 lg:ml-20 px-4">
//             {item.heading && (
//               <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111] leading-tight">
//                 {item.heading}
//               </h2>
//             )}
//             {item.subheading && (
//               <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl">
//                 {item.subheading}
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






//new
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RailOne({ rail }: any) {
  return (
    <section className="p-0">
      {rail.rail_items?.map((item: any, idx: number) => (
        <BackgroundVideo key={idx} item={item} />
      ))}
    </section>
  );
}

function BackgroundVideo({ item }: any) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [muted, setMuted] = useState(true);
  const userToggledRef = useRef(false); // remembers user choice

  // ✅ autoplay init
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.playsInline = true;
    v.muted = true;

    const play = () => v.play().catch(() => {});

    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const handleFirstInteraction = () => {
          play();
          document.removeEventListener("click", handleFirstInteraction);
          document.removeEventListener("touchstart", handleFirstInteraction);
        };
        document.addEventListener("click", handleFirstInteraction);
        document.addEventListener("touchstart", handleFirstInteraction);
      });
    }
  }, []);

  // ✅ sync muted state to video element
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
  }, [muted]);

  // ✅ when rail is out of view: pause + force mute
  // ✅ when rail comes back: play + restore mute state (if user had toggled)
  useEffect(() => {
    const el = wrapperRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = entry.isIntersecting;

        if (!inView) {
          // leaving rail -> always mute + pause
          v.muted = true;
          setMuted(true);
          v.pause();
        } else {
          // coming back -> play again
          v.play().catch(() => {});
          // if user had turned sound ON earlier, restore it
          if (userToggledRef.current) {
            v.muted = false;
            setMuted(false);
          }
        }
      },
      {
        threshold: 0.45, // consider "in view" when ~45% visible
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    userToggledRef.current = true; // user decided
    setMuted((p) => !p);

    const v = videoRef.current;
    if (!v) return;

    // if unmuting, ensure video is playing
    if (muted) {
      v.play().catch(() => {});
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[92vh] md:h-[85vh] overflow-hidden bg-black"
    >
      {/* VIDEO */}
      <motion.video
        ref={videoRef}
        src={item.videoUrl}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="
          absolute inset-0 w-full h-full object-cover
          scale-[1.14] sm:scale-[1.06] md:scale-105
          will-change-transform
        "
        initial={{ scale: 1.18 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* CINEMATIC OVERLAYS */}
      {/* Deep bottom gradient for readable text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/35" />
      {/* Subtle top shading (adds film look) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      {/* Soft highlight glow (premium feel) */}
      <div className="absolute -inset-24 opacity-60 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.10),transparent_55%)]" />

      {/* OPTIONAL: Film grain (very subtle). Remove if you don’t want */}


      {/* SOUND BUTTON */}
      <motion.button
        onClick={toggleMute}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="
          absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-10
          inline-flex items-center gap-2
          rounded-full px-4 sm:px-5 py-2.5
          border border-white/15 bg-white/10 backdrop-blur-xl
          text-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
          hover:bg-white/15 hover:text-white transition
        "
        aria-label="Toggle sound"
      >
        <span className="text-base leading-none">{muted ? "🔇" : "🔊"}</span>
        <span className="text-sm font-medium tracking-tight">
          {muted ? "Sound Off" : "Sound On"}
        </span>
      </motion.button>

      {/* TEXT */}
      {(item.heading || item.subheading) && (
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
            <div className="max-w-3xl">
              {item.heading && (
                <motion.h2
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="
                    text-white
                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                    font-semibold tracking-tight leading-[1.02]
                    drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]
                  "
                >
                  {item.heading}
                </motion.h2>
              )}

              {item.subheading && (
                <motion.p
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="
                    mt-4 sm:mt-6
                    text-white/75
                    text-base sm:text-lg md:text-xl
                    leading-relaxed
                    max-w-2xl
                  "
                >
                  {item.subheading}
                </motion.p>
              )}

              {/* Small accent line (adds “designed” feel) */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 72 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 h-[2px] rounded-full bg-white/50"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


