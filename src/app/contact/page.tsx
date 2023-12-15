"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <CustomCursor />

      <main className="z-50 flex min-h-screen flex-col items-center justify-center p-24"></main>
    </>
  );
}
