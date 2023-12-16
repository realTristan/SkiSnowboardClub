import Button from "@/components/Button";

export default function ManageUsersButton(): JSX.Element {
  return (
    <Button link={true} href="/dashboard/manage-users">
      Manage users
    </Button>
  );
}
