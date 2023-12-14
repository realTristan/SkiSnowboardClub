"use client";

import HeroFooter from "@/app/components/HeroFooter";
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
      <Navbar />
      <CustomCursor />
      <GuelphLogo className="fixed right-7 top-7 z-50 hidden lg:block" />

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
      <HeroFooter />
    </>
  );
}
