"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import RapierBalls from "./components/rapier/RapierBalls";
import CustomCursor from "./components/dynamic/CustomerCursor";

export default function Home() {
  return (
    <>
      <Navbar />
      <BlobScatter />
      <RapierBalls />
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
            Ski and Snowboarding Club for{" "}
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

function BlobScatter() {
  return (
    <svg
      id="visual"
      viewBox="0 0 900 600"
      className="fixed left-0 top-0 -z-50 h-fit w-[50rem] blur-3xl lg:w-[70rem] xl:w-fit"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g>
        <g transform="translate(555 520)">
          <path
            d="M86.3 -97.1C113.7 -79.8 139.2 -54.4 141.2 -27.2C143.2 0 121.8 29 98.2 44.3C74.6 59.7 48.8 61.4 23 76.5C-2.8 91.7 -28.5 120.3 -55.7 123.3C-83 126.3 -111.7 103.7 -124.6 75C-137.4 46.4 -134.2 11.6 -118.8 -11.5C-103.4 -34.6 -75.8 -46 -54 -64.3C-32.1 -82.6 -16.1 -107.7 6.7 -115.7C29.4 -123.7 58.9 -114.4 86.3 -97.1Z"
            className="fill-blue-400 opacity-70"
          ></path>
        </g>
        <g transform="translate(754 232)">
          <path
            d="M72 -87.4C90.9 -70 102.2 -45 103.2 -20.9C104.2 3.2 95 26.4 82.9 48.4C70.8 70.5 55.9 91.5 33.9 104.3C12 117 -17 121.6 -41.1 112.9C-65.2 104.1 -84.5 82 -96.7 57.5C-108.9 33 -114 6 -110.9 -21C-107.9 -47.9 -96.6 -74.8 -76.7 -92C-56.9 -109.2 -28.4 -116.8 -0.9 -115.7C26.6 -114.6 53.1 -104.8 72 -87.4Z"
            className="fill-blue-300 opacity-30"
          ></path>
        </g>
        <g transform="translate(325 2)">
          <path
            d="M38.2 -52C51.3 -34.4 65.2 -24.2 77.7 -6C90.1 12.3 101.1 38.5 94.9 59.9C88.6 81.2 65.1 97.7 41.7 99.7C18.4 101.7 -4.7 89.2 -27 79C-49.2 68.7 -70.4 60.8 -80.7 45.4C-91 30 -90.4 7.1 -85.9 -14.6C-81.5 -36.4 -73.3 -57 -58.3 -74.3C-43.4 -91.5 -21.7 -105.5 -4.6 -100C12.5 -94.6 25 -69.6 38.2 -52Z"
            className="fill-blue-400 opacity-90"
          ></path>
        </g>
        <g transform="translate(207 367)">
          <path
            d="M43.3 -59C55.3 -41.6 63.6 -27.1 66 -11.9C68.4 3.4 65.1 19.5 56.7 31.7C48.4 43.8 35.2 52 20.6 58C5.9 64 -10 67.7 -30 67.1C-50 66.5 -74 61.5 -83.4 47.2C-92.8 32.9 -87.6 9.2 -81.3 -12.2C-74.9 -33.5 -67.4 -52.5 -53.7 -69.6C-40 -86.8 -20 -102.1 -2.2 -99.5C15.7 -96.9 31.4 -76.5 43.3 -59Z"
            className="fill-blue-300 opacity-70"
          ></path>
        </g>
        <g transform="translate(889 565)">
          <path
            d="M29.5 -33.8C39.1 -27.1 48.3 -18.6 50.9 -8.3C53.5 2 49.6 14.2 44.4 27.9C39.2 41.5 32.7 56.7 19.9 66.5C7.1 76.3 -12 80.8 -31.1 77.4C-50.2 73.9 -69.4 62.5 -75 46.4C-80.6 30.3 -72.5 9.5 -62.5 -4.6C-52.4 -18.7 -40.2 -26.1 -29.4 -32.6C-18.7 -39.1 -9.3 -44.8 0.3 -45.1C10 -45.5 19.9 -40.6 29.5 -33.8Z"
            className="fill-blue-300 opacity-50"
          ></path>
        </g>
      </g>
    </svg>
  );
}
