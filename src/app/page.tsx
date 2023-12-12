"use client";

import Navbar from "../components/Navbar";
import CustomCursor from "../components/dynamic/CustomerCursor";
import BlobScatter from "@/components/BlobScatter";

export default function Home() {
  return (
    <>
      <Navbar />
      <BlobScatter />
      <CustomCursor />

      <main className="z-50 flex min-h-screen flex-col items-center justify-center p-24">
        <div className="flex flex-col justify-center p-10 px-10 sm:items-center lg:items-center">
          <h1 className="mt-10 text-center text-6xl font-black text-slate-900 lg:text-8xl xl:mt-0">
            Your{" "}
            <span className="font-slate-900 text-center text-blue-600">
              ultimate
            </span>{" "}
            snow adventure awaits
            <span className="font-black text-blue-600">!</span>
          </h1>
          <p className="w-4/5 pt-2 text-center text-lg font-light text-slate-400">
            Elevate your winter experience with like-minded riders – Join the
            ultimate snow adventure for{" "}
            <span className="font-medium text-slate-500">unforgettable</span>{" "}
            slope sessions and mountain memories!
          </p>
        </div>
        {/* Scroll down arrow */}
        <p className="absolute bottom-0 left-1/2 mb-10 -translate-x-1/2 transform animate-pulse text-center text-xl font-light text-slate-700">
          Scroll for more
        </p>
      </main>
    </>
  );
}
