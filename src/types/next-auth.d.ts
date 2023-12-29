import { Permission } from "@/lib/types";
import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id?: string;
    secret: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
    permissions: Permission[];
  }

  interface Session {
    user: User;
  }
}
