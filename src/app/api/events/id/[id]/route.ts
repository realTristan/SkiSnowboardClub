import { Response } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/lib/prisma";
import { Permission, type ClubEventInfo } from "@/types/types";
import { hasPermissions } from "@/lib/utils/permissions";

/**
 * Get an event
 * @param req The request object
 * @returns The response object
 */
export async function GET({ params }: any) {
  // Check the event ID from the URL query
  if (!params.id || typeof params.id !== "string") {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  return NextResponse.json(
    { ...Response.Success, id: params.id },
    { status: 200 },
  );
}

/**
 * Delete an event
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

  // Delete the event
  return Prisma.deleteEvent(params.id)
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
export async function PUT(req: NextRequest, { params }: any) {
  // Check the event ID from the URL query
  if (!params.id || typeof params.id !== "string") {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  // Get the request body parameters
  const { title, description, date, location, price } = await req.json();
  if (
    !title ||
    !description ||
    !location ||
    date === undefined ||
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

  if (!hasPermissions(user.permissions, [Permission.EDIT_EVENT])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  // Update the event
  const eventInfoObject: ClubEventInfo = {
    title,
    description,
    date,
    location,
    price,
  };

  return await Prisma.updateEvent(params.id, eventInfoObject)
    .then((event) => {
      return NextResponse.json({ event, ...Response.Success }, { status: 200 });
    })
    .catch((_) => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}
