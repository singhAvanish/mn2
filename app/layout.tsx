// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { SessionProvider } from "next-auth/react";
// import Navbar from "./components/Navbar";
// import AboutUs from "./components/AboutUs";

// // FONTS
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Cinematic Studio",
//   description: "Film & Production Studio",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   // Detect if we are inside /admin
//   const isAdmin =
//     typeof window !== "undefined" &&
//     window.location.pathname.startsWith("/admin");

//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
//         {/* ONLY show navbar + about us on non-admin routes */}
//         {!isAdmin && <Navbar />}
        
//         <SessionProvider>{children}</SessionProvider>

//         {!isAdmin && <AboutUs />}

//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./ClientWrapper"; // 👈 add this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinematic Studio",
  description: "Film & Production Studio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* All conditional UI is now inside a separate CLIENT component */}
        <ClientWrapper>
          {children}
        </ClientWrapper>

      </body>
    </html>
  );
}
