import { type Permission } from "@/types/types";
import { type User } from "next-auth";

/**
 * Update the permissions for an user in the array
 * @param users The current users array
 * @param userId The user id of the users' permissions to change
 * @param permissions The updated permissions
 * @returns
 */
export function updatePermissionsArray(
  users: User[],
  userId: string,
  permissions: Permission[],
) {
  return users.map((user: User) => {
    if (user.id === userId) {
      user = {
        ...user,
        permissions,
      };
    }

    return user;
  });
}

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
