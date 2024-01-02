import { Response } from "@/lib/responses";
import { type NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/lib/prisma";
import { Permission } from "@/types/types";
import { hasPermissions } from "@/lib/utils/permissions";
import { del, put } from '@vercel/blob';
import { genId } from "@/lib/crypto";
import { imgb64ToFile } from "@/app/api/events/_utils/images";
import { EVENT_DEFAULT_IMAGE } from "@/lib/constants";
import { isValidEventData } from "../../_utils/checks";

/**
 * Get an event from the database
 * @param req The request object
 * @returns The response object
 */
export async function GET({ params }: any) {
  // Check the event ID from the URL query
  if (!params.id || typeof params.id !== "string") {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  // Get the event
  const event = await Prisma.getEventById(params.id);
  if (!event) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  return NextResponse.json(
    { ...Response.Success, event },
    { status: 200 },
  );
}

/**
 * Delete an event from the database and blob storage
 * @param req The request object
 * @returns The response object
 */
export async function DELETE(req: NextRequest, { params }: any) {
  // Check the event ID from the URL query
  if (!params.id || typeof params.id !== "string") {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
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

  if (!hasPermissions(user.permissions, [Permission.DELETE_EVENT])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  // Delete the banner blob
  const event = await Prisma.getEventById(params.id);
  if (!event) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  await del(event.image);

  // Delete the event
  return Prisma.deleteEvent(params.id)
    .then((_) => {
      return NextResponse.json({ ...Response.Success, event }, { status: 200 });
    })
    .catch((_) => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}

/**
 * Update an event in the database
 * @param req The request object
 * @returns The response object
 */
export async function PUT(req: NextRequest, { params }: any) {
  const eventId = params.id;

  // Check the event ID from the URL query
  if (!eventId || typeof eventId !== "string") {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  // Get the request body parameters
  const { event } = await req.json();

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

  if (!hasPermissions(user.permissions, [Permission.EDIT_EVENT])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  // Store the image in a mutable variable
  let eventImageUrl = event.image || EVENT_DEFAULT_IMAGE;

  // Get the current event from the database and delete the old image
  const prev = await Prisma.getEventById(eventId);
  if (!prev) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  if (prev.image !== EVENT_DEFAULT_IMAGE) {
    await del(prev.image);
  }

  // Update the event image if it exists
  if (eventImageUrl && eventImageUrl !== EVENT_DEFAULT_IMAGE) {
    // Add the new image to the blob storage
    const file = await imgb64ToFile(eventImageUrl, "event-image");
    const fileId = await genId();
    const blob = await put(fileId, file, {
      access: "public",
    });

    if (!blob?.url) {
      return NextResponse.json(Response.InternalError, { status: 500 });
    }

    eventImageUrl = blob.url;
  }

  // Update the event in the database
  return await Prisma.updateEvent(eventId, {
    ...event,
    image: eventImageUrl,
  })
    .then((event) => {
      return NextResponse.json({ event, ...Response.Success }, { status: 200 });
    })
    .catch((_) => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}
