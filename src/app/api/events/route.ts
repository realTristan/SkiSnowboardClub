import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";

/**
 * Get all events
 * @param req The request object
 * @returns The response object
 */
export async function GET(req: NextRequest) {
  return NextResponse.json(Response.Success, { status: 200 });
}
