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

export default function AccountPage() {
  return (
    <>
      <Navbar dark={true} />
      <CustomCursor />
      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed right-7 top-7 z-50 hidden lg:block"
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
    <main className="z-50 flex min-h-screen flex-col items-center justify-start p-40">
      <div className="flex flex-row items-center justify-center gap-4">
        <Image
          src={session?.user?.image!}
          alt="..."
          className="rounded-full"
          width={65}
          height={65}
        />

        <div className="flex flex-col">
          <p className="text-4xl font-black uppercase tracking-wider">
            {session.user.name}
          </p>
          <p className="ml-1 text-sm font-light text-gray-500">
            {session.user.email}
          </p>
        </div>

        <SignOutButton />
        <DashboardButton />
      </div>

      <div className="mt-16 flex flex-col items-start justify-start gap-2">
        <div className="flex flex-wrap gap-7 lg:gap-12">
          {events.length === 0 && <NothingYet />}
          {events.length > 0 &&
            events.map((event: ClubEvent) => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>
      </div>
    </main>
  );
}

async function getPurchasedEvents(userSecret: string): Promise<ClubEvent[]> {
  return await fetch("/api/events/user", {
    method: "GET",
    headers: { Authorization: userSecret },
  })
    .then((res) => res.json())
    .then((data) => data.events as ClubEvent[]);
}

function NothingYet(): JSX.Element {
  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-3">
      <p className="text-center text-5xl font-extrabold tracking-wide">
        Nothing here yet
      </p>
      <p className="text-center text-base font-light">
        Register for an event to see it here
      </p>
      <a
        href="/trips-and-tickets"
        className="btn mt-2 border border-black px-10 py-3 text-sm duration-300 ease-in-out hover:bg-black hover:text-white"
      >
        Register
      </a>
    </div>
  );
}
