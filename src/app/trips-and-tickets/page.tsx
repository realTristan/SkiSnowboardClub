"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import EventCard from "./components/EventCard";
import { type ClubEvent } from "@/lib/types";
import { base64encode } from "@/lib/crypto";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { testEvents } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Navbar dark={true} />
      <CustomCursor />
      <GuelphLogo
        dark={true}
        className="fixed right-7 top-7 z-50 hidden lg:block"
      />

      <main className="z-50 flex min-h-screen flex-wrap items-center justify-center gap-7 p-24 lg:gap-12">
        {testEvents.map((event: ClubEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
      </main>

      <SocialMedia dark={true} />
    </>
  );
}
