import { type NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { hasPermissions } from "@/lib/utils/permissions";
import { type ClubEvent, Permission } from "@/types/types";
import { Prisma } from "@/lib/prisma";
import { genId } from "@/lib/crypto";
import { put } from "@vercel/blob";
import { imgb64ToFile } from "@/app/api/events/_utils/images";
import { EVENT_DEFAULT_IMAGE } from "@/lib/constants";
import { isValidEventData } from "./_utils/checks";

/**
 * Get all events
 * @param req The request object
 * @returns The response object
 */
export async function GET() {
  const events = await Prisma.getEvents();
  return NextResponse.json({ events, ...Response.Success }, { status: 200 });
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
    const blob = await put(fileId, file, {
      access: "public",
    });

    if (!blob?.url) {
      return NextResponse.json(Response.InternalError, { status: 500 });
    }

    imageUrl = blob.url;
  }

  // Create the event
  const id: string = await genId();
  const _event: ClubEvent = {
    id,
    image: imageUrl,
    title: event.title || "New Event",
    description: event.description || "No description provided.",
    location: event.location || "No location provided.",
    date: event.date,
    price: event.price,
    formUrl: event.formUrl,
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
