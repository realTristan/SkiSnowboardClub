"use client";

import Navbar from "../components/Navbar";
import CustomCursor from "../components/dynamic/CustomerCursor";
import Image from "next/image";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMediaLogos from "@/components/logos/SocialMediaLogos";

export default function Home() {
  return (
    <>
      <Navbar centered={true} />
      <CustomCursor />
      <GuelphLogo className="fixed left-10 top-10 z-50 block lg:hidden xl:left-auto xl:right-10 xl:block" />
      <SocialMediaLogos />

      <Image
        src="/images/hero-background.png"
        alt="hero"
        layout="fill"
        objectFit="cover"
        className="-z-50"
        quality={100}
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-slate-900 opacity-[85%]"></div>

      {/* Main */}
      <main className="z-50 flex min-h-screen flex-col items-center justify-center p-10 md:p-24">
        <h1 className="text-center font-tangerine text-5xl font-black text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Conquer the slopes
        </h1>

        <p className="mt-7 w-full text-center text-base font-light text-white md:w-[37rem] lg:text-lg">
          Elevate your experience with like-minded riders - Join the ski and
          snowboarding club for epic slope sessions and mountain memories!
        </p>
        <a
          href="https://gryphlife.uoguelph.ca/organization/skiandsnowboard"
          target="_blank"
          className="btn btn group mt-7 flex flex-row items-center justify-center gap-2 rounded-none border border-white px-16 py-3 text-white duration-300 ease-in-out hover:bg-white hover:text-slate-900"
        >
          <p>Join us</p>
        </a>
      </main>

      <p className="absolute bottom-0 left-1/2 mb-10 -translate-x-1/2 transform animate-pulse text-center text-base font-light text-white">
        See trips and tickets for our upcoming events!
      </p>
    </>
  );
}
