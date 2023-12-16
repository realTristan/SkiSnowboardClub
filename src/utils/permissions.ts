import { Permission } from "@/lib/types";

/**
 * Get whether the user has the required permissions
 * @param permissions The permissions that the user has
 * @param required The permissions that the user must have
 * @returns
 */
export function hasPermissions(
  permissions: Permission[],
  required: Permission[],
) {
  return (
    required.every((permission) => permissions.includes(permission)) ||
    permissions.includes(Permission.ADMIN)
  );
}

/**
 * Get whether the requesting user can access the dashboard
 * @param permissions The permissions that the user has
 * @returns Whether or not the user can access the dashboard
 */
export function canAccessDashboard(permissions: Permission[]) {
  for (const permission of permissions) {
    if (permission !== Permission.DEFAULT) return true;
  }
  return false;
}
