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
import MainWrapper from "@/components/MainWrapper";
import { BrowserView } from "react-device-detect";

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

  if (status === Status.LOADING) {
    return <LoadingCenter />;
  }

  if (events.length === 0) {
    return <EmptyEvents />;
  }

  return (
    <>
      <Navbar dark={true} centered={false} className="bg-white" />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <MainWrapper className="flex-wrap gap-12 px-7 pb-20 pt-40 sm:items-start sm:justify-start sm:px-16">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </MainWrapper>

      <SocialMedia dark={true} />
    </>
  );
}
