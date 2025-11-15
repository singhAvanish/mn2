"use client";

import { useState } from "react";

export default function RailRenderer({ rail }) {
  const pos = Number(rail.rail_pos);
  const rail_name = rail.rail_name || "";
  const items = rail.rail_items || [];
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // RAIL 1 — vertical list of videos
  if (pos === 1) {
    return (
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6">{rail_name}</h2>

        <div className="space-y-8">
          {items.map((it, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold mb-2">{it.heading}</h3>
              <video controls className="w-full rounded shadow">
                <source src={it.videoUrl} />
              </video>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // RAIL 2 — grid of categories (each item is a category)
  if (pos === 2) {
    return (
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6">{rail_name}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((cat, idx) => (
            <div key={idx} className="cursor-pointer" onClick={() => setActiveCategory(idx)}>
              <img src={cat.buttonImage} className="w-full h-48 object-cover rounded shadow" />
            </div>
          ))}
        </div>

        {activeCategory !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded max-w-4xl max-h-[85vh] overflow-auto relative">
              <button className="absolute top-3 right-3 text-xl" onClick={() => setActiveCategory(null)}>✕</button>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(items[activeCategory].images || []).map((img: string, i: number) => (
                  <img key={i} src={img} className="w-full h-48 object-cover rounded" />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // fallback
  return null;
}
