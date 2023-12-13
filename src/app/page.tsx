"use client";

import HeroFooter from "@/components/home/HeroFooter";
import Navbar from "../components/fixed/Navbar";
import CustomCursor from "../components/dynamic/CustomerCursor";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import DarkBackground from "@/components/home/DarkBackground";
import GuelphLogo from "@/components/fixed/GuelphLogo";
import InstagramLogo from "@/components/fixed/InstagramLogo";
import SocialMedia from "@/components/home/SocialMedia";

export default function Home() {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <GuelphLogo className="fixed right-7 top-7 z-50 hidden lg:block" />

      <Image
        src="/images/bg-3.png"
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

      <SocialMedia />
      <HeroFooter />
    </>
  );
}
