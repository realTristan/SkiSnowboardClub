import Link from "next/link";

export default function BackButton(): JSX.Element {
  return (
    <Link
      href="/account/dashboard"
      className="btn text-sm underline hover:text-blue-500"
    >
      Back to dashboard
    </Link>
  );
}
