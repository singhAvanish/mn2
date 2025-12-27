"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function RailFive({ rail }: any) {
  const items = Array.isArray(rail?.rail_items) ? rail.rail_items : [];

  // Desktop/tablet pages (3 per slide)
  const pages = useMemo(() => {
    const chunk = 3;
    const out: any[] = [];
    for (let i = 0; i < items.length; i += chunk) {
      out.push(items.slice(i, i + chunk));
    }
    return out.length ? out : [[]];
  }, [items]);

  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // swipe handling
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = () => {
    if (isMobile) {
      setPage((p) => (p + 1) % Math.max(1, items.length));
    } else {
      setPage((p) => Math.min(p + 1, pages.length - 1));
    }
  };

  const prev = () => {
    if (isMobile) {
      setPage((p) => (p - 1 + Math.max(1, items.length)) % Math.max(1, items.length));
    } else {
      setPage((p) => Math.max(p - 1, 0));
    }
  };

  // Mobile swipe
  const onTouchStart = (e: any) => {
    startX.current = e.touches?.[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: any) => {
    if (startX.current === null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? startX.current;
    const diff = endX - startX.current;

    if (diff > 50) prev();
    if (diff < -50) next();

    startX.current = null;
  };

  const visibleItems = isMobile
    ? items[page]
      ? [items[page]]
      : []
    : pages[page] || [];

  const dotsCount = isMobile ? items.length : pages.length;

  return (
    <section
      id="review-section"
      className="bg-[#f8f8f8] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="w-10 sm:w-12 md:w-16 h-1 bg-red-600 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111]">
            {rail?.rail_name || "Top Reviews"}
          </h2>
          <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base md:text-lg">
            What people say after working with us
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onTouchStart={isMobile ? onTouchStart : undefined}
          onTouchEnd={isMobile ? onTouchEnd : undefined}
        >
          {/* Desktop arrows */}
          {!isMobile && pages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition"
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition"
              >
                ›
              </button>
            </>
          )}

          {/* Cards */}
          <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-3 gap-6"}>
            {visibleItems.map((r: any, idx: number) => {
              const userName = r.userName || "User";
              const reviewText = r.review || "";
              const rating = parseInt(String(r.rating ?? "0"), 10);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg border border-black/5 p-6 sm:p-7 relative overflow-hidden"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,0,0,0.06),transparent_60%)]" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#111] text-base sm:text-lg">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Verified Review</p>
                      </div>

                      <Stars value={rating} />
                    </div>

                    <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                      “{reviewText}”
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          {dotsCount > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: dotsCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    page === i ? "bg-red-600 w-8" : "bg-black/20 w-2"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Helper */}
          {isMobile && items.length > 1 && (
            <p className="text-center text-xs text-gray-500 mt-3">
              Swipe left or right to see more reviews
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  const v = Math.min(5, Math.max(0, Number.isFinite(value) ? value : 0));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < v ? "text-red-600" : "text-black/15"}`}>
          ★
        </span>
      ))}
    </div>
  );
}
