"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import EventCard from "./components/EventCard";
import { Status, type ClubEvent } from "@/lib/types";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { useEffect, useState } from "react";
import LoadingCenter from "@/components/Loading";

export default function TripsAndTicketsPage() {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [status, setStatus] = useState<Status>(Status.LOADING);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events);
        setStatus(Status.SUCCESS);
      })
      .catch((_) => setStatus(Status.ERROR));
  }, []);

  return (
    <>
      <Navbar dark={true} />
      <CustomCursor />
      <GuelphLogo
        dark={true}
        className="fixed right-7 top-7 z-50 hidden lg:block"
      />

      <main className="z-50 flex min-h-screen flex-wrap items-center justify-center gap-7 p-24 pt-40 lg:gap-12">
        {status === Status.ERROR && <LoadingCenter />}
        {events.length === 0 && <NothingYet />}
        {events.length > 0 &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </main>

      <SocialMedia dark={true} />
    </>
  );
}

function NothingYet(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-5xl font-extrabold tracking-wide">
        Nothing here yet
      </p>
      <p className="text-center text-lg font-light">
        Check back later for more events
      </p>
    </div>
  );
}
