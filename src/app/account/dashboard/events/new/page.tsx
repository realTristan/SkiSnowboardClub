"use client";

import LoadingCenter from "@/components/Loading";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { type FormEvent, useEffect, useState, useRef } from "react";
import { canAccessDashboard } from "@/lib/utils/permissions";
import InvalidPermissions from "../../../../../components/InvalidPermissions";
import InvalidSession from "@/components/InvalidSession";
import Image from "next/image";
import { Status, type ClubEvent } from "@/types/types";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/Button";
import ErrorMessage from "@/components/ErrorMessage";

export default function DashboardNewEventage() {
  return (
    <>
      <Navbar dark={true} />
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
  const [date, setDate] = useState(new Date().toDateString());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [formUrl, setFormUrl] = useState("");
  const [creationStatus, setCreationStatus] = useState<Status>(Status.IDLE);
  const imageRef = useRef<HTMLInputElement>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
      return;
    }
  }, [status]);

  if (status === "loading") {
    return <LoadingCenter />;
  }

  if (status === "unauthenticated" || !session) {
    return <InvalidSession />;
  }

  if (!canAccessDashboard(session.user.permissions)) {
    return <InvalidPermissions />;
  }

  return (
    <main className="z-50 flex min-h-screen flex-col items-start justify-start gap-5 px-16 pb-20 pt-40">
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
      {creationStatus === Status.LOADING ? (
        <LoadingCenter />
      ) : (
        <form
          className="flex w-full flex-col gap-5"
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setCreationStatus(Status.LOADING);

            const event = {
              title,
              description,
              date,
              location,
              price,
              formUrl,
            } as ClubEvent;

            if (imageRef.current?.files) {
              const image = imageRef.current.files[0];
              if (image) {
                // Convert the image to base64
                const imageb64 = await new Promise<string>((resolve) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => resolve(reader.result as string);
                });

                event.image = imageb64;
              }
            }

            const res = await createEvent(session.user.secret, event);
            if (!res.ok) {
              return setCreationStatus(Status.ERROR);
            }
            
            setCreationStatus(Status.SUCCESS);
            router.push("/account/dashboard");
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
            <span className="text-sm text-black">Event Date (required)</span>
            <input
              type="date"
              className="border border-black p-3 text-sm focus:outline-black"
              onChange={(e) => setDate(e.target.value)}
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
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Event Price (required)</span>
            <input
              type="number"
              maxLength={40}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="border border-black p-3 text-sm focus:outline-black"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Microsoft Form URL (required)</span>
            <input
              type="text"
              className="border border-black p-3 text-sm focus:outline-black"
              onChange={(e) => setFormUrl(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Event Image</span>
            <input
              type="file"
              className="border border-black p-3 text-sm focus:outline-black"
              ref={imageRef}
            />
          </label>
          <Button dark={true} type="submit">
            Create Event
          </Button>
          <Button href="/account/dashboard" dark={true}>
            Cancel
          </Button>

          {creationStatus === Status.ERROR && (
            <ErrorMessage>
              An error occurred while updating the event - make sure that all
              fields are filled out correctly.
            </ErrorMessage>
          )}
        </form>
      )}
    </main>
  );
}

async function createEvent(userSecret: string, event: ClubEvent) {
  return await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: userSecret,
    },
    body: JSON.stringify({ event }),
  });
}
