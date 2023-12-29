import { type Permission } from "@/lib/types";
import { User } from "next-auth";

/**
 * Update an user
 * @param adminSecret The admin's secret token
 * @param user The user object being updated
 */
export async function updateUserPermissions(
  adminSecret: string,
  user: User,
  permissions: Permission[],
) {
  return await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: adminSecret,
    },
    body: JSON.stringify({
      userId: user.id,
      data: { ...user, permissions },
    }),
  });
}
