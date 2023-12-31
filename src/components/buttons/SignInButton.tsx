import { signIn } from "next-auth/react";
import Button from "./Button";
import GoogleSvg from "../svgs/Google";

interface SignInButtonProps {
  className?: string;
}
export default function SignInButton(props: SignInButtonProps): JSX.Element {
  return (
    <Button className={props.className} onClick={() => signIn("google")}>
      <GoogleSvg/>
      <p>Sign in</p>
    </Button>
  );
}
