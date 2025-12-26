// "use client";

// import { useState } from "react";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md text-white px-6 md:px-10 py-4 flex items-center justify-between z-50">
      
//       {/* BRAND */}
//       <h1 className="text-2xl font-bold tracking-tight">MANGO MULTIMEDIA</h1>

//       {/* DESKTOP MENU */}
//       <div className="hidden md:flex gap-10 text-lg">
//         <button onClick={() => scrollTo("about-section")} className="hover:text-gray-300">
//           About Us
//         </button>
//         <button onClick={() => scrollTo("work-section")} className="hover:text-gray-300">
//           Work
//         </button>
//         <button onClick={() => scrollTo("brands-section")} className="hover:text-gray-300">
//           Brands
//         </button>
//         <button onClick={() => scrollTo("contact-section")} className="hover:text-gray-300">
//           Contact
//         </button>
//       </div>

//       {/* HAMBURGER ICON (Mobile) */}
//       <button
//         className="md:hidden text-3xl focus:outline-none"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? "✕" : "☰"}
//       </button>

//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <div className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md text-white py-6 px-6 flex flex-col gap-6 text-lg md:hidden animate-slideDown">
//           <button onClick={() => clickAndClose("about-section", setMenuOpen)}>
//             About Us
//           </button>
//           <button onClick={() => clickAndClose("work-section", setMenuOpen)}>
//             Work
//           </button>
//           <button onClick={() => clickAndClose("brands-section", setMenuOpen)}>
//             Brands
//           </button>
//           <button onClick={() => clickAndClose("contact-section", setMenuOpen)}>
//             Contact
//           </button>
//         </div>
//       )}

//       {/* Animation Style */}
//       <style jsx>{`
//         .animate-slideDown {
//           animation: slideDown 0.25s ease-out forwards;
//         }
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0px);
//           }
//         }
//       `}</style>
//     </nav>
//   );
// }

// /* Smooth scroll function */
// function scrollTo(id) {
//   const el = document.getElementById(id);
//   if (!el) return;
//   el.scrollIntoView({ behavior: "smooth", block: "start" });
// }

// /* Close menu after clicking in mobile */
// function clickAndClose(id, setMenuOpen) {
//   scrollTo(id);
//   setMenuOpen(false);
// }


"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl text-black px-6 md:px-12 py-4 flex items-center justify-between z-50 border-b border-black/10">
      
      {/* BRAND */}
      <h1 className="text-xl md:text-2xl font-bold tracking-wide">
        MANGO MULTIMEDIA
      </h1>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-10 text-sm font-medium">
        {["About", "Work", "Brands", "Contact"].map((label, i) => (
          <button
            key={i}
            onClick={() =>
              scrollTo(
                label === "About"
                  ? "about-section"
                  : label === "Work"
                  ? "work-section"
                  : label === "Brands"
                  ? "brands-section"
                  : "contact-section"
              )
            }
            className="relative group"
          >
            {label}
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* MOBILE */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-black py-8 px-6 flex flex-col gap-6 text-lg md:hidden shadow-xl">
          {["about-section", "work-section", "brands-section", "contact-section"].map(
            (id, i) => (
              <button
                key={i}
                onClick={() => clickAndClose(id, setMenuOpen)}
                className="text-left font-medium"
              >
                {id.replace("-section", "").toUpperCase()}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clickAndClose(id: string, setMenuOpen: any) {
  scrollTo(id);
  setMenuOpen(false);
}
