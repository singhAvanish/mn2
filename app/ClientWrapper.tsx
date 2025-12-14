"use client";

import { SessionProvider } from "next-auth/react";
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
      {!isAdmin && (
    
          <Navbar></Navbar>
         
        
      )}

      <SessionProvider>{children}</SessionProvider>
      {!isAdmin && (
        
          
          <AboutUs></AboutUs>
        
      )}
    </>
  );
}
