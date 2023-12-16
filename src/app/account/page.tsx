"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import EventCard from "./components/EventCard";
import { ClubEvent } from "@/lib/types";
import LoadingCenter from "@/components/Loading";
import DashboardButton from "./components/DashboardButton";
import InvalidSession from "@/components/InvalidSession";
import { getPurchasedEvents } from "./utils/getPurchasedEvents";
import UserHeader from "./components/UserHeader";

export default function AccountPage() {
  return (
    <>
      <Navbar dark={true} centered={false} className="bg-white" />
      <CustomCursor />
      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <SessionProvider>
        <Main />
      </SessionProvider>

      <div className="fixed -bottom-8 left-1/2 mb-10 -translate-x-1/2 transform bg-white px-7 py-2">
        <p className="text-center text-xs font-light text-black">
          Your receipt (sent to you by email) is proof of purchase. Please have
          it with you at the event.
        </p>
      </div>
    </>
  );
}

function Main(): JSX.Element {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<ClubEvent[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
      return;
    }

    if (status === "authenticated") {
      getPurchasedEvents(session?.user?.secret!).then((events) => {
        setEvents(events);
      });
    }
  }, [status, session]);

  if (status === "loading") {
    return <LoadingCenter />;
  }

  if (!session || !session.user) {
    return <InvalidSession />;
  }

  return (
    <main className="z-50 flex min-h-screen flex-col items-start justify-start px-16 pb-20 pt-40">
      <UserHeader user={session.user} />

      <div className="my-8 flex flex-row gap-2">
        <SignOutButton />
        <DashboardButton />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-7 lg:gap-12">
        {events.length > 0 &&
          events.map((event: ClubEvent) => (
            <EventCard key={event.id} event={event} />
          ))}
      </div>
    </main>
  );
}
