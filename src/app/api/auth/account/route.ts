import { Prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";

/**
 * Add an user to the users database
 * @param req The request object
 * @returns The response object
 */
export async function PUT(req: NextRequest) {
  // Get the user's bearer token from the headers
  const secret = req.headers.get("Authorization");
  if (!secret) {
    return NextResponse.json(Response.InvalidHeaders, { status: 400 });
  }

  // Get the user's info from the request body
  const { name, email, image } = await req.json();
  if (!name || !email || !image) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // Get the user's info
  const user = await Prisma.getUser(secret);

  // If the user doesn't exist, create them
  if (!user) {
    await Prisma.createUser(name, email, image, secret);

    return NextResponse.json(
      {
        user: { name, email, image, permissions: [], purchasedEventIds: [] },
        ...Response.Success,
      },
      { status: 200 },
    );
  }

  // If the user's name has changed, update it
  if (user.name !== name) {
    await Prisma.updateUserName(secret, name);
  }

  // If the user's image has changed, update it
  if (user.image !== image) {
    await Prisma.updateUserImage(secret, image);
  }

  // Return the user's info
  return NextResponse.json(
    {
      user: {
        name,
        email,
        image,
        permissions: user.permissions,
        purchasedEventIds: user.purchasedEventIds,
      },
      ...Response.Success,
    },
    { status: 200 },
  );
}
