import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sha256 } from "./crypto";

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
      const image: string = session.user.image || "/images/default-pfp.png";
      const id: string = session.user.id;
      const secret: string | null = email
        ? await sha256(email + bearerSecret)
        : null;

      session.user = {
        id,
        email,
        name,
        secret,
        image,
        purchasedEventIds: [],
        permissions: [],
      };

      // Verify the user is updated in the database
      if (secret && email && name) {
        // Make a PUT request to /api/auth/account
        const res = await import("@/app/api/users/route");
        const response = await res.PUT({
          // @ts-ignore
          headers: {
            get: (name: string) => {
              return (
                {
                  Authorization: secret,
                }[name] || null
              );
            },
          },
          json: async () => ({
            name,
            email,
            image,
          }),
        });

        if (response.ok) {
          const json = await response.json();

          session.user.permissions = json.user.permissions;
          session.user.purchasedEventIds = json.user.purchasedEventIds;
        }
      }

      return session;
    },
  },
});
