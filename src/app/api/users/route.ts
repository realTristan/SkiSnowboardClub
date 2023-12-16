import { Prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { Permission } from "@/lib/types";
import { hasPermissions } from "@/utils/permissions";
import { genId } from "@/lib/crypto";

/**
 * Get all of the users
 * @param req The request object
 * @returns The response object
 */
export async function GET(req: NextRequest) {
  return await Prisma.getUsers()
    .then((users) => {
      return NextResponse.json({ users, ...Response.Success }, { status: 200 });
    })
    .catch((err) => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}

/**
 * Update an user in the users database
 * @param req The request object
 * @returns The response object
 */
export async function POST(req: NextRequest) {
  // Get the user id and data from the request body
  const { userId, data } = await req.json();

  // Get the authorization from the headers
  const secret = req.headers.get("Authorization");
  if (!secret) {
    return NextResponse.json(Response.InvalidHeaders, { status: 400 });
  }

  // Verify that the user has the correct permissions
  const user = await Prisma.getUser(secret);
  if (!user) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  if (!hasPermissions(user.permissions, [Permission.ADMIN])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  return await Prisma.updateUser(userId, data)
    .then((user) => {
      return NextResponse.json({ user, ...Response.Success }, { status: 200 });
    })
    .catch((err) => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}

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
    const id: string = await genId();

    await Prisma.createUser(id, name, email, image, secret);

    return NextResponse.json(
      {
        user: {
          id,
          name,
          email,
          image,
          permissions: [],
          purchasedEventIds: [],
        },
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
        id: user.id,
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
