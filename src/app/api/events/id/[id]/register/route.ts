import { Response } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

/**
 * Register the user for an event. The software will hold the ticket for the user
 * for 10 minutes, after which the ticket will be released unless the user
 * paid for the ticket.
 * @param req The request object
 * @returns The response object
 */
export async function GET(req: NextRequest, { params }: any) {
  // Check the event ID from the URL query
  if (!params.id || typeof params.id !== "string") {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  return NextResponse.json(
    { ...Response.Success, id: params.id },
    { status: 200 },
  );
}
