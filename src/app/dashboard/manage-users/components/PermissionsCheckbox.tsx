import { Permission, User } from "@/lib/types";
import { Checkbox } from "@nextui-org/react";
import { Dispatch, SetStateAction, PropsWithChildren } from "react";
import { updatePermissionsArray } from "../utils/updatePermissionsArray";

interface PermissionCheckboxProps {
  permission: Permission;
  user: User;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}
export default function PermissionCheckbox(
  props: PropsWithChildren<PermissionCheckboxProps>,
): JSX.Element {
  const { permission, user, users, setUsers } = props;

  return (
    <Checkbox
      size="lg"
      defaultSelected={user.permissions.includes(permission)}
      onChange={(e) => {
        const newPermissions = e.target.checked
          ? [...user.permissions, permission]
          : user.permissions.filter((p) => p !== permission);

        setUsers(updatePermissionsArray(users, user.id, newPermissions));
      }}
    >
      {props.children}
    </Checkbox>
  );
}
