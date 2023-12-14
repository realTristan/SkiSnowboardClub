import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sha256 } from "./crypto";

export const authOptions = NextAuth({
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
      const secret: string | null = email
        ? await sha256(email + bearerSecret)
        : null;

      session.user = {
        email,
        image: session.user.image,
        name: session.user.name,
        secret,
      };

      return session;
    },
  },
});

export default authOptions;
