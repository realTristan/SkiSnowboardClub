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
import MainWrapper from "@/components/MainWrapper";
import { Checkbox, NextUIProvider } from "@nextui-org/react";
import { BrowserView } from "react-device-detect";
import {
  EVENT_DEFAULT_DESCRIPTION,
  EVENT_DEFAULT_LOCATION,
  EVENT_DEFAULT_REGISTRATION,
  EVENT_DEFAULT_TITLE,
  EVENT_DEFAULT_VISIBLE,
} from "@/lib/constants";

/**
 * Creates a new event
 * @param userSecret The user secret
 * @param event The event to create
 * @returns A promise that resolves when the event is created
 */
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

export default function DashboardNewEventPage() {
  return (
    <>
      <Navbar dark={true} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <SessionProvider>
        <NextUIProvider>
          <Main />
        </NextUIProvider>
      </SessionProvider>
    </>
  );
}

function Main(): JSX.Element {
  // Not required
  const [title, setTitle] = useState(EVENT_DEFAULT_TITLE);
  const [description, setDescription] = useState(EVENT_DEFAULT_DESCRIPTION);
  const [location, setLocation] = useState(EVENT_DEFAULT_LOCATION);
  const [visible, setVisible] = useState<boolean>(EVENT_DEFAULT_VISIBLE);
  const [allowRegistration, setAllowRegistration] = useState<boolean>(
    EVENT_DEFAULT_REGISTRATION,
  );

  // Required
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [formUrl, setFormUrl] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);

  // Status of the event creation
  const [creationStatus, setCreationStatus] = useState<Status>(Status.IDLE);

  // Session and router
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

  /**
   * Creates a new event
   * @param e The form event
   * @returns A promise that resolves when the event is created
   */
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setCreationStatus(Status.LOADING);

    const secret = session?.user.secret;
    if (!secret) {
      return setCreationStatus(Status.ERROR);
    }

    const event = {
      title,
      description,
      visible,
      date: date.toDateString(),
      location,
      price,
      allowRegistration,
      formUrl,
    } as ClubEvent;

    if (imageRef.current?.files) {
      const image = imageRef.current.files[0];

      // Convert the image to base64
      if (image) {
        event.image = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result as string);
        });
      }
    }

    const res = await createEvent(secret, event);
    if (!res.ok) {
      return setCreationStatus(Status.ERROR);
    }

    setCreationStatus(Status.SUCCESS);
    router.push("/account/dashboard");
  }

  return (
    <MainWrapper className="flex-col items-start justify-start gap-5 px-7 pb-20 pt-40 sm:px-16">
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
        <form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          {/* Title */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Event Title</span>
            <input
              type="text"
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-black p-3 text-sm focus:outline-black"
            />
          </label>

          {/* Description */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Event Description</span>
            <textarea
              maxLength={100}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-black p-3 text-sm focus:outline-black"
              rows={5}
            ></textarea>
          </label>

          {/* Location */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Event Location</span>
            <input
              type="text"
              maxLength={100}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-black p-3 text-sm focus:outline-black"
            />
          </label>

          {/* Image */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Event Image</span>
            <input
              type="file"
              accept="image/*"
              className="border border-black p-3 text-sm focus:outline-black"
              ref={imageRef}
            />
          </label>

          {/* Date */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Event Date (required)</span>
            <input
              type="date"
              className="border border-black p-3 text-sm focus:outline-black"
              onChange={(e) => {
                // Increase the date by 1 day (fix bug)
                const date = new Date(e.target.value);
                date.setDate(date.getDate() + 1);
                setDate(date);
              }}
            />
          </label>

          {/* Price */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">Event Price (required)</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="border border-black p-3 text-sm focus:outline-black"
            />
          </label>

          {/* Form URL */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Microsoft Form URL (required)
            </span>
            <input
              type="text"
              value={formUrl}
              className="border border-black p-3 text-sm focus:outline-black"
              onChange={(e) => setFormUrl(e.target.value)}
            />
          </label>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-2">
            <Checkbox
              defaultSelected={visible}
              onChange={(e) => setVisible(e.target.checked)}
            >
              Visible to all users
            </Checkbox>
            <Checkbox
              defaultSelected={allowRegistration}
              onChange={(e) => setAllowRegistration(e.target.checked)}
            >
              Allow registration
            </Checkbox>
          </div>

          {/* Buttons */}
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
    </MainWrapper>
  );
}
