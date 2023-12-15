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
