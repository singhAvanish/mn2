"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && (
        <>
          <Navbar></Navbar>
          <HeroSection></HeroSection>
        </>
      )}

      <SessionProvider>{children}</SessionProvider>
      {!isAdmin && (
        <>
        <AboutUs></AboutUs>
        <Footer></Footer>
        </>
        )}
    </>
  );
}
