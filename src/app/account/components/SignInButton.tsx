import { signIn } from "next-auth/react";

export default function SignInButton(): JSX.Element {
  return (
    <button
      className="btn border border-black px-10 py-3 duration-300 ease-in-out hover:bg-black hover:text-white"
      onClick={() => signIn("google")}
    >
      Sign in
    </button>
  );
}
