"use client";

import LoadingCenter from "@/components/Loading";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import Image from "next/image";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SignOutButton from "../../components/SignOutButton";
import { type ClubEvent, Status } from "@/lib/types";
import EventCard from "./components/EventCard";
import Link from "next/link";
import { canAccessDashboard } from "@/utils/permissions";
import NoPermissions from "./components/NoPermissions";
import InvalidSession from "@/components/InvalidSession";

export default function DashboardPage() {
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

  if (status === "loading") {
    return <LoadingCenter />;
  }

  if (!session || !session.user) {
    return <InvalidSession />;
  }

  if (!canAccessDashboard(session.user.permissions)) {
    return <NoPermissions />;
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
      </div>

      <div className="mt-16 flex flex-col items-start justify-start gap-5">
        <div className="flex flex-row gap-2">
          <Link
            href="/dashboard/events/new"
            className="btn border border-black px-10 py-3 text-sm duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Create event
          </Link>
          <Link
            href="/dashboard/manage-users"
            className="btn border border-black px-10 py-3 text-sm duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Manage users
          </Link>
        </div>

        <div className="flex flex-wrap gap-7">
          {fetchStatus === Status.LOADING ? (
            <LoadingCenter />
          ) : (
            events.map((event: ClubEvent) => (
              <EventCard
                key={event.id}
                event={event}
                userSecret={session?.user?.secret || ""}
                permissions={session.user.permissions}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
