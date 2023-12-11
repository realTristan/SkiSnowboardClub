import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed z-50 flex w-screen flex-row items-center justify-center px-8 py-8 backdrop-blur-3xl">
      <div className="flex flex-row items-center space-x-10">
        <Link
          href="/"
          className="btn cursor-pointer px-5 py-3 text-lg font-normal tracking-wider text-slate-900 duration-300 ease-in-out hover:scale-110"
        >
          HOME
        </Link>
        <Link
          href="/"
          className="btn cursor-pointer px-5 py-3 text-lg font-normal tracking-wider text-slate-900 duration-300 ease-in-out hover:scale-110"
        >
          TRIPS AND TICKETS
        </Link>
        <Link
          href="/"
          className="btn cursor-pointer px-5 py-3 text-lg font-normal tracking-wider text-slate-900 duration-300 ease-in-out hover:scale-110"
        >
          ABOUT US
        </Link>
        <Link
          href="/"
          className="btn cursor-pointer px-5 py-3 text-lg font-normal tracking-wider text-slate-900 duration-300 ease-in-out hover:scale-110"
        >
          CONTACT
        </Link>
      </div>
    </nav>
  );
}
