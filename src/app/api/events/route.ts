import { type NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { hasPermissions } from "@/lib/utils/permissions";
import { type ClubEvent, Permission } from "@/types/types";
import { Prisma } from "@/lib/prisma";
import { genId } from "@/lib/crypto";
import { put } from "@vercel/blob";
import { imgb64ToFile } from "@/app/api/events/_utils/images";
import {
  EVENT_DEFAULT_DESCRIPTION,
  EVENT_DEFAULT_IMAGE,
  EVENT_DEFAULT_LOCATION,
  EVENT_DEFAULT_NAME,
  EVENT_DEFAULT_VISIBLE,
} from "@/lib/constants";
import { isValidEventData } from "./_utils/checks";

/**
 * Get all events
 * @param req The request object
 * @returns The response object
 */
export async function GET(req: NextRequest) {
  const events = await Prisma.getEvents();

  // If there's an authorization header, check if the user has the correct permissions
  const secret = req.headers.get("Authorization");
  if (secret) {
    const user = await Prisma.getUser(secret);

    if (
      !user ||
      !hasPermissions(user.permissions, [
        Permission.POST_EVENT,
        Permission.EDIT_EVENT,
        Permission.DELETE_EVENT,
      ])
    ) {
      return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
    }

    return NextResponse.json({ events, ...Response.Success }, { status: 200 });
  }

  return NextResponse.json(
    { events: events.filter((event) => event.visible), ...Response.Success },
    { status: 200 },
  );
}

/**
 * Create an event
 * @param req The request object
 * @returns The response object
 */
export async function POST(req: NextRequest) {
  // Get the request body parameters
  const { event } = await req.json();
  if (!event.date || event.price === undefined || !event.formUrl) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // If the event is invalid, return an error
  if (!isValidEventData(event)) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // Get the user's bearer token from the headers
  const secret = req.headers.get("Authorization");
  if (!secret) {
    return NextResponse.json(Response.InvalidHeaders, { status: 400 });
  }

  // Verify that the user has the correct permissions
  const user = await Prisma.getUser(secret);
  if (!user) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  if (!hasPermissions(user.permissions, [Permission.POST_EVENT])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  // Add the image to the blob storage
  let imageUrl = EVENT_DEFAULT_IMAGE;
  if (event.image) {
    const file = await imgb64ToFile(event.image, "event-image");
    const fileId = await genId();
    try {
      const blob = await put(fileId, file, {
        access: "public",
      });

      imageUrl = blob.url;
    } catch (e) {
      return NextResponse.json(Response.InternalError, { status: 500 });
    }
  }

  // Create the event
  const id: string = await genId();
  const _event: ClubEvent = {
    id,
    image: imageUrl,
    title: event.title || EVENT_DEFAULT_NAME,
    description: event.description || EVENT_DEFAULT_DESCRIPTION,
    location: event.location || EVENT_DEFAULT_LOCATION,
    date: event.date,
    price: event.price,
    formUrl: event.formUrl,
    visible: event.visible || EVENT_DEFAULT_VISIBLE,
  };

  return await Prisma.createEvent(_event)
    .then((event) => {
      return NextResponse.json(
        { event: { ...event, id: event.id }, ...Response.Success },
        { status: 200 },
      );
    })
    .catch(() => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}
