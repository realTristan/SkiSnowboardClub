import { signOut } from "next-auth/react";

export default function SignOutButton(): JSX.Element {
  return (
    <button
      className="btn ml-10 border border-black px-10 py-3 duration-300 ease-in-out hover:bg-black hover:text-white"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
