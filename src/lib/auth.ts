import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sha256 } from "./crypto";
import { Prisma } from "./prisma";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      const bearerSecret: string | undefined = process.env.BEARER_SECRET;

      if (!bearerSecret) {
        throw new Error("BEARER_SECRET is not defined");
      }

      if (!session) {
        throw new Error("Session is not defined");
      }

      if (!session.user) {
        throw new Error("User is not defined");
      }

      const email: string | null = session.user.email;
      const name: string | null = session.user.name;
      const secret: string | null = email
        ? await sha256(email + bearerSecret)
        : null;

      session.user = {
        email,
        name,
        secret,
        image: session.user.image,
        purchasedEventIds: [],
        permissions: [],
      };

      // If the user doesn't already exist in the database, add them
      if (secret && email && name) {
        const user = await Prisma.getUser(secret);

        if (!user) {
          await Prisma.createUser(name, email, secret);
          return session;
        }

        session.user.permissions = user.permissions;
        session.user.purchasedEventIds = user.purchasedEventIds;
      }

      return session;
    },
  },
});
