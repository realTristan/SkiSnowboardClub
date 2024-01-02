"use client";

import LoadingCenter from "@/components/Loading";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type ClubEvent, Status } from "@/types/types";
import EventCard from "./_components/EventCard";
import { canAccessDashboard } from "@/lib/utils/permissions";
import InvalidPermissions from "@/components/InvalidPermissions";
import InvalidSession from "@/components/InvalidSession";
import SignOutButton from "@/components/buttons/SignOutButton";
import MainWrapper from "@/components/MainWrapper";
import Button from "@/components/buttons/Button";
import UserHead from "../_components/UserHead";

export default function DashboardPage() {
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

  if (status === "unauthenticated" || !session) {
    return <InvalidSession />;
  }

  if (!canAccessDashboard(session.user.permissions)) {
    return <InvalidPermissions />;
  }

  return (
    <MainWrapper className="flex-col px-7 pb-20 pt-40 sm:items-start sm:justify-start sm:px-16">
      <UserHead user={session.user} />

      <div className="my-8 flex w-full flex-wrap gap-2">
        <SignOutButton className="w-full sm:w-auto" />
        <Button
          href="/account/dashboard/manage-users"
          className="w-full sm:w-auto"
        >
          Manage users
        </Button>
        <Button
          href="/account/dashboard/events/new"
          className="w-full sm:w-auto"
        >
          Create event
        </Button>
      </div>

      <div className="flex w-full flex-wrap gap-7">
        {fetchStatus === Status.SUCCESS &&
          events.map((event: ClubEvent) => (
            <EventCard
              key={event.id}
              event={event}
              user={session.user}
              permissions={session.user.permissions}
            />
          ))}
      </div>
    </MainWrapper>
  );
}
