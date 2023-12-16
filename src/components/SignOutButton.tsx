import { signOut } from "next-auth/react";
import Button from "./Button";

export default function SignOutButton(props: {
  className?: string;
}): JSX.Element {
  return (
    <Button className={props.className} onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
