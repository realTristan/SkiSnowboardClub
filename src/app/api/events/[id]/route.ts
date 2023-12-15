import { Response } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/lib/prisma";
import { Permission, type ClubEventInfo } from "@/lib/types";
import { hasPermissions } from "@/utils/hasPermissions";

interface NextParams {
  id: string;
}

/**
 * Get an event
 * @param req The request object
 * @returns The response object
 */
export async function GET(req: NextRequest, { id }: NextParams) {
  return NextResponse.json(Response.Success, { status: 200 });
}

/**
 * Create an event
 * @param req The request object
 * @returns The response object
 */
export async function POST(req: NextRequest, { id }: NextParams) {
  return NextResponse.json(Response.Success, { status: 200 });
}

/**
 * Delete an event
 * @param req The request object
 * @returns The response object
 */
export async function DELETE(req: NextRequest, { id }: NextParams) {
  // Check the event ID from the URL query
  if (!id || typeof id !== "string") {
    return NextResponse.json(Response.InvalidQuery, { status: 405 });
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

  // Delete the event
  return Prisma.deleteEvent(id)
    .then((_) => {
      return NextResponse.json(Response.Success, { status: 200 });
    })
    .catch((_) => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}

/**
 * Update an event
 * @param req The request object
 * @returns The response object
 */
export async function PUT(req: NextRequest, { id }: NextParams) {
  // Check the event ID from the URL query
  if (!id || typeof id !== "string") {
    return NextResponse.json(Response.InvalidQuery, { status: 405 });
  }

  // Get the title, description, date, location from the request body
  const { title, description, date, location } = await req.json();
  if (!title || !description || !date || !location) {
    return NextResponse.json(Response.InvalidBody, { status: 405 });
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

  // Update the event
  const eventInfoObject: ClubEventInfo = {
    title,
    description,
    date,
    location,
  };

  return Prisma.updateEvent(id, eventInfoObject)
    .then((_) => {
      return NextResponse.json(
        { event: eventInfoObject, ...Response.Success },
        { status: 200 },
      );
    })
    .catch((_) => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}
