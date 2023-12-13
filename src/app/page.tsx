"use client";

import HeroFooter from "@/components/home/HeroFooter";
import Navbar from "../components/Navbar";
import CustomCursor from "../components/dynamic/CustomerCursor";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import DarkBackground from "@/components/home/DarkBackground";

export default function Home() {
  return (
    <>
      <Navbar />
      <CustomCursor />

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

      <HeroFooter />
    </>
  );
}
