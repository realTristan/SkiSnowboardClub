import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sha256 } from "./crypto";
import { NextRequest } from "next/server";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async session({ session }) {
      const bearerSecret: string | undefined = process.env.BEARER_SECRET;
      if (!bearerSecret) {
        throw new Error("BEARER_SECRET is not defined");
      }

      // User data constants for the session
      const email: string = session.user.email;
      const name: string = session.user.name;
      const image: string = session.user.image || "/images/default-pfp.png";
      const secret: string = await sha256(email + bearerSecret)

      // Verify the user is updated in the database by sending a PUT request to the backend
      const get = (name: string) => {
        return name === "Authorization" ? secret : "";
      }
      const body = async () => ({
        name,
        email,
        image,
      });

      // Update the user in the database and get their data (two birds with one stone)
      const res = await import("@/app/api/users/route");
      const response = await res.PUT({
        json: body,
        headers: {
          get,
        },
      } as NextRequest);

      if (!response.ok) {
        return session;
      }

      const json = await response.json();
      session.user ={
        email,
        name,
        secret,
        image,
        permissions: json.user.permissions,
        id: json.user.id,
      };
      
      return session;
    },
  },
});
