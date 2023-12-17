"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";

export default function ContactPage() {
  return (
    <>
      <Navbar dark={true} centered={false} className="bg-white" />
      <CustomCursor />
      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <main className="z-50 flex min-h-screen flex-col items-center justify-center p-24"></main>
    </>
  );
}
