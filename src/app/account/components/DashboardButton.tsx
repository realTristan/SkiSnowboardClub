import Link from "next/link";

export default function DashboardButton(): JSX.Element {
  return (
    <Link
      href="/dashboard"
      className="btn border border-black px-10 py-3 text-sm duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white"
    >
      Dashboard
    </Link>
  );
}
