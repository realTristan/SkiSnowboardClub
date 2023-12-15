import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { hasPermissions } from "@/utils/permissions";
import { ClubEventCreationData, Permission } from "@/lib/types";
import { Prisma } from "@/lib/prisma";
import { genId } from "@/lib/crypto";

/**
 * Get all events
 * @param req The request object
 * @returns The response object
 */
export async function GET(req: NextRequest) {
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
  const { title, description, date, location, available, price } =
    await req.json();
  if (
    !title ||
    !description ||
    !location ||
    date === undefined ||
    available === undefined ||
    price === undefined
  ) {
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

  // Create the event
  const id: string = await genId();
  const eventInfoObject: ClubEventCreationData = {
    title,
    description,
    date,
    location,
    available,
    price,
  };

  return Prisma.createEvent(id, eventInfoObject)
    .then((event) => {
      return NextResponse.json(
        { event: { ...event, id }, ...Response.Success },
        { status: 200 },
      );
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}
