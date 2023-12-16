import { signIn } from "next-auth/react";
import Button from "./Button";

export default function SignInButton(props: {
  className?: string;
}): JSX.Element {
  return (
    <Button className={props.className} onClick={() => signIn("google")} />
  );
}
