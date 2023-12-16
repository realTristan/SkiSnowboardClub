"use client";

import LoadingCenter from "@/components/Loading";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import Image from "next/image";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type ClubEvent, Status } from "@/lib/types";
import EventCard from "./components/EventCard";
import Link from "next/link";
import { canAccessDashboard } from "@/utils/permissions";
import NoPermissions from "./components/NoPermissions";
import InvalidSession from "@/components/InvalidSession";
import SignOutButton from "@/components/SignOutButton";
import ManageUsersButton from "./components/ManageUsersButton";
import CreateEventButton from "./components/CreateEventButton";
import UserHeader from "./components/UserHeader";

export default function DashboardPage() {
  return (
    <>
      <Navbar dark={true} centered={false} className="bg-white" />
      <CustomCursor />
      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed right-7 top-7 z-50 hidden lg:block"
      />

      <SessionProvider>
        <Main />
      </SessionProvider>
    </>
  );
}

function Main(): JSX.Element {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [fetchStatus, setFetchStatus] = useState<Status>(Status.LOADING);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
      return;
    }

    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events);
        setFetchStatus(Status.SUCCESS);
      })
      .catch((_) => setFetchStatus(Status.ERROR));
  }, [status]);

  if (status === "loading" || fetchStatus === Status.LOADING) {
    return <LoadingCenter />;
  }

  if (!session || !session.user) {
    return <InvalidSession />;
  }

  if (!canAccessDashboard(session.user.permissions)) {
    return <NoPermissions />;
  }

  return (
    <main className="z-50 flex min-h-screen flex-col items-start justify-start px-16 pb-20 pt-40">
      <UserHeader user={session.user} />

      <div className="my-8 flex flex-row gap-2">
        <SignOutButton />
        <ManageUsersButton />
        <CreateEventButton />
      </div>

      <div className="flex flex-wrap gap-7">
        {fetchStatus === Status.SUCCESS &&
          events.map((event: ClubEvent) => (
            <EventCard
              key={event.id}
              event={event}
              userSecret={session?.user?.secret || ""}
              permissions={session.user.permissions}
            />
          ))}
      </div>
    </main>
  );
}
