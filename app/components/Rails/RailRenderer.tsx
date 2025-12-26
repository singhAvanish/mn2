// "use client";

// import RailOne from "./RailOne";
// import RailTwo from "./RailTwo";
// import RailThree from "./RailThree";
// import RailFour from "./RailFour";

// export default function RailRenderer({ rails }: { rails: any[] }) {
//   if (!rails || rails.length === 0) return null;

//   // sort rails by rail_pos (important)
//   const sortedRails = [...rails].sort(
//     (a, b) => Number(a.rail_pos) - Number(b.rail_pos)
//   );

//   const rail1 = sortedRails.find((r) => Number(r.rail_pos) === 1);
//   const rail2 = sortedRails.find((r) => Number(r.rail_pos) === 2);
//   const rail3 = sortedRails.find((r) => Number(r.rail_pos) === 3);
//   const rail4 = sortedRails.find((r) => Number(r.rail_pos) === 4);

//   return (
//     <div className="bg-[#f8f8f8]">
//       {/* ================= RAIL 1 (VIDEO HERO) ================= */}
//       {rail1 && <RailOne rail={rail1} />}

//       {/* ================= RAIL 2 (WORK / GALLERY) ================= */}
//       {rail2 && <RailTwo rail={rail2} />}

//       {/* ================= RAIL 3 + 4 (BRANDS + PROJECTS) ================= */}
//       {(rail3 || rail4) && (
//         <section className="py-28 px-6 md:px-10 lg:px-16 bg-[#f8f8f8]">
//           <div className="max-w-7xl mx-auto">

//             {/* SECTION HEADING */}
//             <div className="text-center mb-20">
//               <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111]">
//                 Brands & Upcoming Projects
//               </h2>
//               <p className="mt-4 text-gray-600 text-lg">
//                 Trusted collaborations and future-ready productions
//               </p>
//             </div>

//             {/* CONTENT GRID */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
//               {rail3 && (
//                 <div className="bg-white rounded-2xl shadow-lg p-6">
//                   <RailThree rail={rail3} />
//                 </div>
//               )}

//               {rail4 && (
//                 <div className="bg-white rounded-2xl shadow-lg p-6">
//                   <RailFour rail={rail4} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }
"use client";

import RailOne from "./RailOne";
import RailTwo from "./RailTwo";
import RailThree from "./RailThree";
import RailFour from "./RailFour";

export default function RailRenderer({ rails }: { rails: any[] }) {
  if (!rails || rails.length === 0) return null;

  // sort rails by rail_pos (important)
  const sortedRails = [...rails].sort(
    (a, b) => Number(a.rail_pos) - Number(b.rail_pos)
  );

  const rail1 = sortedRails.find((r) => Number(r.rail_pos) === 1);
  const rail2 = sortedRails.find((r) => Number(r.rail_pos) === 2);
  const rail3 = sortedRails.find((r) => Number(r.rail_pos) === 3);
  const rail4 = sortedRails.find((r) => Number(r.rail_pos) === 4);

  return (
    <div className="bg-[#f8f8f8]">
      {/* ================= RAIL 1 (VIDEO HERO) ================= */}
      {rail1 && <RailOne rail={rail1} />}

      {/* ================= RAIL 2 (WORK / GALLERY) ================= */}
      {rail2 && <RailTwo rail={rail2} />}

      {/* ================= RAIL 3 + 4 (BRANDS + PROJECTS) ================= */}
      {(rail3 || rail4) && (
        <div className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto">
            {/* SECTION HEADING */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
              <div className="w-10 sm:w-12 md:w-14 lg:w-16 h-1 bg-red-600 mx-auto mb-4 sm:mb-5 md:mb-6"></div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#111]">
                Brands & Upcoming Projects
              </h2>

              <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
                Trusted collaborations and future-ready productions
              </p>
            </div>

            {/* CONTENT GRID (desktop side-by-side, mobile stacked) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14">
              {rail3 && (
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6">
                  <RailThree rail={rail3} />
                </div>
              )}

              {rail4 && (
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6">
                  <RailFour rail={rail4} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
