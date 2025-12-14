"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <AboutUs />}
    </>
  );
}
