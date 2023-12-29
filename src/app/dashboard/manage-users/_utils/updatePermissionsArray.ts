import { type Permission } from "@/lib/types";
import { User } from "next-auth";

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
