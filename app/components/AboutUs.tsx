"use client";

import { useEffect, useState } from "react";

export default function AboutUs() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("about-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 150) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="about-section"
      className="w-full py-24 bg-[#F6F2EB] flex flex-col items-center"
    >
      {/* HEADING */}
      <h2
        className={`text-4xl md:text-5xl font-extrabold tracking-tight text-[#3D2F23] mb-14 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        About Us
      </h2>

      {/* CONTENT GRID */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-14 px-6 md:px-10">

        {/* IMAGE */}
        <div
          className={`transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-[#E6DFD6]">
            <img
              src="https://images.pexels.com/photos/3757960/pexels-photo-3757960.jpeg"
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>

        {/* TEXT */}
        <div
          className={`flex flex-col justify-center transition-all duration-700 ease-out delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="text-3xl font-semibold text-[#3D2F23] mb-5">
            Crafting Cinematic Experiences
          </h3>

          <p className="text-[#594A3C] leading-relaxed text-lg mb-4">
            We are a creative cinematic studio specializing in brand films,
            commercial shoots, live event productions, backstage experiences,
            and cinematic storytelling with warmth, depth, and emotion.
          </p>

          <p className="text-[#594A3C] leading-relaxed text-lg mb-4">
            Our team of directors, cinematographers, editors, and designers work
            together to turn brands and stories into unforgettable visual
            experiences that feel real, immersive, and timeless.
          </p>

          <p className="text-[#594A3C] leading-relaxed text-lg">
            From concept to execution — we blend artistry, emotion, and
            technical mastery to create visuals that stay in memory long after
            the screen fades.
          </p>

          {/* BUTTON */}
          <button className="mt-8 px-7 py-3.5 bg-[#6B4F3A] text-[#F8F4EF] rounded-full text-lg font-medium shadow-md hover:bg-[#5C4432] transition-all">
            Learn More →
          </button>
        </div>
      </div>
    </section>
  );
}
