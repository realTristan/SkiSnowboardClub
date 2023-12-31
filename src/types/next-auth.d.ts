import { Permission } from "@/types/types";
import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    secret: string;
    name: string ;
    email: string;
    image: string;
    permissions: Permission[];
  }

  interface Session {
    user: User;
  }
}
