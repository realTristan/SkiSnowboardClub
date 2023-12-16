"use client";

import Navbar from "../components/Navbar";
import CustomCursor from "../components/dynamic/CustomerCursor";
import Image from "next/image";
import Hero from "@/app/components/Hero";
import DarkBackground from "@/app/components/DarkBackground";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMediaLogos from "@/components/logos/SocialMediaLogos";

export default function Home() {
  return (
    <>
      <Navbar centered={true} />
      <CustomCursor />
      <GuelphLogo className="fixed left-7 top-7 z-50 block lg:hidden xl:left-auto xl:right-7 xl:block" />

      <Image
        src="/images/hero-background.png"
        alt="hero"
        layout="fill"
        objectFit="cover"
        className="-z-50"
        quality={100}
        priority
      />

      <DarkBackground />

      <main className="z-50 flex min-h-screen flex-col items-center justify-center p-24">
        <Hero />
      </main>

      <SocialMediaLogos />

      <p className="absolute bottom-0 left-1/2 mb-10 -translate-x-1/2 transform animate-pulse text-center text-base font-light text-white">
        See trips and tickets for our upcoming events!
      </p>
    </>
  );
}
