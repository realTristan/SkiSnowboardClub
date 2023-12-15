"use client";

import LoadingCenter from "@/components/Loading";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { canAccessDashboard } from "@/utils/permissions";
import NoPermissions from "../../components/NoPermissions";
import InvalidSession from "@/components/InvalidSession";
import Image from "next/image";
import { ClubEventInfo } from "@/lib/types";
import { genId } from "@/lib/crypto";

export default function DashboardNewEventage() {
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
  const [date, setDate] = useState(new Date().getTime() / 1000);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
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

  if (!canAccessDashboard(session.user.permissions)) {
    return <NoPermissions />;
  }

  return (
    <main className="z-50 flex min-h-screen flex-col items-start justify-start gap-5 p-40">
      <div className="mb-4 flex flex-row items-center justify-center gap-4">
        <Image
          src={session?.user?.image!}
          alt="..."
          className="rounded-full"
          width={65}
          height={65}
        />
        <h1 className="text-5xl font-extrabold text-black">NEW EVENT</h1>
      </div>
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const event: ClubEventInfo = {
            title,
            description,
            date,
            location,
          };

          await createEvent(session.user.secret || "", event);
        }}
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm text-black">Event Title</span>
          <input
            type="text"
            maxLength={15}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black p-3 text-sm focus:outline-black"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-black">Event Description</span>
          <textarea
            maxLength={50}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-black p-3 text-sm focus:outline-black"
            rows={5}
          ></textarea>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-black">Event Date</span>
          <input
            type="date"
            onChange={(e) => {
              // Create a Date object
              const date = new Date(e.target.value);

              // Get the time value in milliseconds and convert it to seconds
              const seconds = date.getTime() / 1000;

              // Set the date state
              setDate(seconds);
            }}
            className="border border-black p-3 text-sm focus:outline-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-black">Event Location</span>
          <input
            type="text"
            maxLength={40}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-black p-3 text-sm focus:outline-black"
          />
        </label>
        <button className="btn border border-black bg-black p-3 text-sm text-white duration-300 ease-in-out hover:bg-white hover:text-black">
          Create Event
        </button>
        <a
          href="/dashboard"
          className="btn border border-black bg-black p-3 text-center text-sm text-white duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          Cancel
        </a>
      </form>
    </main>
  );
}

async function createEvent(userSecret: string, event: ClubEventInfo) {
  return await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: userSecret,
    },
    body: JSON.stringify(event),
  });
}
