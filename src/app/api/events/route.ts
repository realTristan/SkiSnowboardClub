import { Response } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(Response.Success, { status: 200 });
}
