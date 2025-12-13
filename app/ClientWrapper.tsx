"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import { SessionProvider } from "next-auth/react";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* Show global components only on non-admin pages */}
      {!isAdmin && <Navbar />}
      <SessionProvider>{children}</SessionProvider>
      {!isAdmin && <AboutUs />}
    </>
  );
}
