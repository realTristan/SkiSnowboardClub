"use client";

import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import EventCard from "./_components/EventCard";
import { Status, type ClubEvent } from "@/types/types";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { useEffect, useState } from "react";
import LoadingCenter from "@/components/Loading";
import EmptyEvents from "./_components/EmptyEvents";

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
      <Navbar dark={true} centered={false} className="bg-white" />
      <CustomCursor />
      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <main className="z-50 flex min-h-screen flex-wrap items-start justify-start gap-7 px-16 pb-20 pt-40 lg:gap-12">
        {status === Status.LOADING && <LoadingCenter />}
        {status !== Status.LOADING && events.length === 0 && <EmptyEvents />}
        {events.length > 0 &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </main>

      <SocialMedia dark={true} />
    </>
  );
}
