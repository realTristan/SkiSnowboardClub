import { type Permission } from "@/types/types";
import { Checkbox } from "@nextui-org/react";
import {
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren,
} from "react";
import { updatePermissionsArray } from "../_utils/permissions";
import { type User } from "next-auth";

interface PermissionCheckboxProps {
  permission: Permission;
  user: User;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  disabled?: boolean;
}
export default function PermissionCheckbox(
  props: PropsWithChildren<PermissionCheckboxProps>,
): JSX.Element {
  const { permission, user, users, setUsers } = props;
  const userId = user.id;

  if (!userId) {
    return <></>;
  }

  return (
    <Checkbox
      size="lg"
      isDisabled={props.disabled}
      className={props.disabled ? "opacity-50" : ""}
      defaultSelected={user.permissions.includes(permission)}
      onChange={(e) => {
        const newPermissions = e.target.checked
          ? [...user.permissions, permission]
          : user.permissions.filter((p) => p !== permission);

        setUsers(updatePermissionsArray(users, userId, newPermissions));
      }}
    >
      {props.children}
    </Checkbox>
  );
}
