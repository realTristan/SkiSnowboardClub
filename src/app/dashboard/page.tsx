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
import { testEvents } from "@/lib/constants";
import { ClubEvent, Permission } from "@/lib/types";
import EventCard from "./components/EventCard";
import SignInButton from "@/components/SignInButton";
import { Session } from "next-auth";

// Check if the requesting user has only the DEFAULT permission
function canAccessPage(session: Session): boolean {
  for (const permission of session.user.permissions) {
    if (permission !== Permission.DEFAULT) return true;
  }
  return false;
}

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

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
      return;
    }
  }, [status]);

  if (status === "loading") {
    return <LoadingCenter />;
  }

  if (!session || !session.user) {
    return <InvalidSession />;
  }

  if (!canAccessPage(session)) {
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

      <div className="mt-16 flex flex-col items-start justify-start gap-2">
        <div className="flex flex-wrap gap-7 lg:gap-12">
          {testEvents.map((event: ClubEvent) => (
            <EventCard
              key={event.id}
              event={event}
              userSecret={session?.user?.secret || ""}
              permissions={session.user.permissions}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function InvalidSession(): JSX.Element {
  return (
    <main className="z-50 flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <p className="text-center text-5xl font-extrabold tracking-wide">
        Invalid session
      </p>
      <SignInButton />
    </main>
  );
}

function NoPermissions(): JSX.Element {
  return (
    <main className="z-50 flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <p className="mb-4 text-center text-5xl font-extrabold tracking-wide">
        Invalid permissions
      </p>
      <SignInButton />
    </main>
  );
}
