import { signOut } from "next-auth/react";
import Button from "./Button";

interface SignOutButtonProps {
  className?: string;
}
export default function SignOutButton(props: SignOutButtonProps): JSX.Element {
  return (
    <Button className={props.className} onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
