import { Permission } from "@/lib/types";

export function hasPermissions(
  permissions: Permission[],
  required: Permission[],
) {
  return (
    required.every((permission) => permissions.includes(permission)) ||
    permissions.includes(Permission.ADMIN)
  );
}

export function canAccessDashboard(permissions: Permission[]) {
  for (const permission of permissions) {
    if (permission !== Permission.DEFAULT) return true;
  }
  return false;
}
