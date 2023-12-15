import { Response } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/lib/prisma";

/**
 * Get the events an user is attending
 * @param req The request object
 * @returns The response object
 */
export async function GET(req: NextRequest) {
  // Get the user's bearer token from the headers
  const secret = req.headers.get("Authorization");
  if (!secret) {
    return NextResponse.json(Response.InvalidHeaders, { status: 400 });
  }

  // Get the event
  return Prisma.getPurchasedEvents(secret)
    .then((events) => {
      return NextResponse.json(
        { events, ...Response.Success },
        { status: 200 },
      );
    })
    .catch((_) => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}
