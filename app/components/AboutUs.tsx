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
      className="w-full py-24 md:py-32 bg-black flex flex-col items-center relative overflow-hidden"
    >
      {/* Background subtle pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10 lg:px-16">
        {/* HEADING */}
        <div className="text-center mb-16">
          <div
            className={`w-16 h-1 bg-red-600 mx-auto mb-6 transition-all duration-700 ${
              visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          ></div>
          
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            About Us
          </h2>
          
          <p
            className={`text-gray-400 text-lg transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Bringing your vision to life through cinematic storytelling
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* IMAGE */}
          <div
            className={`transition-all duration-700 ease-out delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-800 group">
              {/* Red overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              
              <img
                src="https://images.pexels.com/photos/3757960/pexels-photo-3757960.jpeg"
                alt="About our studio"
                className="w-full h-[450px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-red-600"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-red-600"></div>
            </div>
          </div>

          {/* TEXT */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 ease-out delay-300 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            {/* Small label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-red-600"></div>
              <span className="text-red-600 text-sm font-semibold uppercase tracking-wider">
                Our Story
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Crafting Cinematic Experiences
            </h3>

            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-5">
              We are a creative cinematic studio specializing in brand films,
              commercial shoots, live event productions, backstage experiences,
              and cinematic storytelling with warmth, depth, and emotion.
            </p>

            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-5">
              Our team of directors, cinematographers, editors, and designers work
              together to turn brands and stories into unforgettable visual
              experiences that feel real, immersive, and timeless.
            </p>

            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-8">
              From concept to execution — we blend artistry, emotion, and
              technical mastery to create visuals that stay in memory long after
              the screen fades.
            </p>

            {/* Stats or features (optional) */}
            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-800">
              <div>
                <div className="text-3xl font-bold text-red-600 mb-1">500+</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-1">50+</div>
                <div className="text-gray-400 text-sm">Brands</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-1">10+</div>
                <div className="text-gray-400 text-sm">Years</div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3.5 bg-red-600 text-white rounded-md text-sm font-semibold shadow-lg hover:bg-red-700 transition-all duration-300 hover:shadow-red-600/50 uppercase tracking-wider flex items-center gap-2 group">
                Learn More
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="px-8 py-3.5 bg-transparent border-2 border-gray-700 text-white rounded-md text-sm font-semibold hover:border-red-600 hover:text-red-600 transition-all duration-300 uppercase tracking-wider">
                Our Work
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl"></div>
    </section>
  );
}