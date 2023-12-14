"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";

export default function Home() {
  return (
    <>
      <Navbar />
      <CustomCursor />

      <main className="z-50 flex min-h-screen flex-col items-center justify-center p-24">
        <h1>Admin Dashboard</h1>
      </main>
    </>
  );
}
