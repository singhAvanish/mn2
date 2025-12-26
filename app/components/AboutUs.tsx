


// "use client";

// export default function AboutUs() {
//   return (
//     <section className="bg-black text-white px-4 sm:px-6 md:px-16 lg:px-20 py-16 sm:py-20">
//       {/* ================= FOUNDERS ================= */}
//       <div className="mt-16 sm:mt-20">
//         <h3 className="text-xs tracking-widest text-gray-400 mb-8 sm:mb-10">
//           • OUR FOUNDERS
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
//           {/* Founder 1 */}
//           <div className="group">
//             <div className="overflow-hidden rounded-lg">
//               <img
//                 src="/mantoo.jpg"
//                 alt="Mantu Kumar Bhatia"
//                 className="w-full h-[300px] sm:h-[380px] md:h-[420px] object-cover object-top transition duration-500"

//               />
//             </div>
//             <h4 className="mt-6 text-lg sm:text-xl font-semibold">
//               Mantu Kumar Bhatia
//             </h4>
//             <p className="text-sm text-gray-400 mt-2">
//               Co-Founder & Managing Director
//             </p>
//           </div>

//           {/* Founder 2 */}
//           <div className="group">
//             <div className="overflow-hidden rounded-lg">
//               <img
//                 src="/arvind.jpg"
//                 alt="Arvind Chauhan"
//                 className="w-full h-[300px] sm:h-[380px] md:h-[420px] object-cover object-top transition duration-500"

//               />
//             </div>
//             <h4 className="mt-6 text-lg sm:text-xl font-semibold">
//               Arvind Chauhan
//             </h4>
//             <p className="text-sm text-gray-400 mt-2">
//               Co-Founder & Creative Director
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ================= COMPANY INFO ================= */}
//       <div className="mt-24 sm:mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-b border-white/10 pb-14 sm:pb-16">
//         {/* HEADQUARTERS */}
//         <div>
//           <h4 className="text-xs tracking-widest text-gray-400 mb-6">
//             • HEADQUARTERS
//           </h4>

//           <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed">
//             Mango Multimedia Company<br />
//             GR 01, Mango Multimedia Company,<br />
//             Aasra Building, Gulmohar Ln,<br />
//             Samarth Nagar, Chunabhatti, Sion,<br />
//             Mumbai, Maharashtra 400022, India
//           </p>

//           <a
//             href="https://google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDQxMzhqMGo3qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KQezBoPmKIQNMab-kjdTst5P&daddr=GR+01,+Mango+Multimedia+Company,+Aasra+building,+Gulmohar+Ln,+Samarth+Nagar,+Chunabhatti,+Sion,+Mumbai,+Maharashtra+400022"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-6 sm:mt-8 flex items-center gap-3 text-sm text-white group"
//           >
//             SEE ALL LOCATIONS
//             <span className="inline-block transform group-hover:translate-x-2 transition">
//               →
//             </span>
//           </a>
//         </div>

//         {/* QUICK CONNECT */}
//         <div>
//           <h4 className="text-xs tracking-widest text-gray-400 mb-6">
//             • QUICK CONNECT
//           </h4>

//           <ul className="space-y-3 text-sm text-gray-300">
//             <li>📞 +91 8652286252 / +91 8652286072</li>
//             <li>✉️ mangomultimediacompany@gmail.com</li>
//           </ul>

//           <button className="mt-6 sm:mt-8 flex items-center gap-3 text-sm text-white group">
//             CONNECT WITH US
//             <span className="inline-block transform group-hover:translate-x-2 transition">
//               →
//             </span>
//           </button>
//         </div>

//         {/* QUICK LINKS */}
//         <div>
//           <h4 className="text-xs tracking-widest text-gray-400 mb-6">
//             • QUICK LINKS
//           </h4>

//           {/* <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-300">
//             <span>ABOUT</span>
//             <span>SPORTS EVENTS</span>
//             <span>SERVICES</span>
//             <span>MUSIC EVENTS</span>
//             <span>CLIENTELE</span>
//             <span>CORPORATE EVENTS</span>
//             <span>CAREERS</span>
//             <span>SPECIAL EVENTS</span>
//             <span>NEWS</span>
//           </div> */}

//           {/* Social */}
//           <div className="flex gap-6 mt-8 text-lg">
//             <span className="cursor-pointer hover:text-gray-400">in</span>
//             <span className="cursor-pointer hover:text-gray-400">◎</span>
//           </div>
//         </div>
//       </div>

//       {/* ================= FOOTER ================= */}
//       <div className="mt-6 sm:mt-2 pt-6 text-xs text-gray-500 flex flex-col md:flex-row gap-4 items-center md:items-start justify-between text-center md:text-left">
//         <span>© ALL RIGHTS RESERVED — Mango Multimedia Company</span>
//       </div>
//     </section>
//   );
// }


"use client";

export default function AboutUs() {
  return (
    <section
      id="about-section"
      className="bg-[#f8f8f8] text-[#111] px-4 sm:px-6 md:px-16 lg:px-20 py-20"
    >
      {/* ================= FOUNDERS ================= */}
      <div>
        <h3 className="text-xs tracking-widest text-gray-500 mb-12 uppercase">
          • Our Founders
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Founder 1 */}
          <div className="group">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src="/mantoo.jpg"
                alt="Mantu Kumar Bhatia"
                className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover object-top transition duration-700 group-hover:scale-105"
              />
            </div>
            <h4 className="mt-6 text-xl font-semibold">
              Mantu Kumar Bhatia
            </h4>
            <p className="text-sm text-gray-600 mt-2">
              Co-Founder & Managing Director
            </p>
          </div>

          {/* Founder 2 */}
          <div className="group">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src="/arvind.jpg"
                alt="Arvind Chauhan"
                className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover object-top transition duration-700 group-hover:scale-105"
              />
            </div>
            <h4 className="mt-6 text-xl font-semibold">
              Arvind Chauhan
            </h4>
            <p className="text-sm text-gray-600 mt-2">
              Co-Founder & Creative Director
            </p>
          </div>
        </div>
      </div>

      {/* ================= COMPANY INFO ================= */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-14 border-t border-black/10 pt-20">
        {/* HQ */}
        <div>
          <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
            • Headquarters
          </h4>

          <p className="text-sm text-gray-700 leading-relaxed">
            Mango Multimedia Company<br />
            GR 01, Aasra Building,<br />
            Gulmohar Lane, Chunabhatti,<br />
            Mumbai, Maharashtra 400022<br />
            India
          </p>

          <a
            href="https://google.com/maps"
            target="_blank"
            className="inline-flex items-center gap-3 mt-8 text-sm font-medium text-black group"
          >
            See location
            <span className="transform group-hover:translate-x-2 transition">→</span>
          </a>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
            • Quick Connect
          </h4>

          <ul className="space-y-3 text-sm text-gray-700">
            <li>📞 +91 8652286252</li>
            <li>📞 +91 8652286072</li>
            <li>✉️ mangomultimediacompany@gmail.com</li>
          </ul>
<a
  href="mailto:mangomultimediacompany@gmail.com?subject=Business%20Enquiry%20-%20Mango%20Multimedia&body=Hello%20Mango%20Multimedia%2C%0A%0AI%20would%20like%20to%20connect%20with%20you.%0A%0AThanks%2C"
  className="mt-6 sm:mt-8 flex items-center gap-3 text-sm text-white group"
>
  CONNECT WITH US
  <span className="inline-block transform group-hover:translate-x-2 transition">
    →
  </span>
</a>

        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
            • Follow Us
          </h4>

          <div className="flex gap-6 text-xl text-gray-700">
            <span className="cursor-pointer hover:text-black">in</span>
            <span className="cursor-pointer hover:text-black">◎</span>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="mt-16 pt-6 text-xs text-gray-500 flex justify-between flex-wrap gap-4 border-t border-black/10">
        <span>© Mango Multimedia Company</span>
        <span>All rights reserved</span>
      </div>
    </section>
  );
}


