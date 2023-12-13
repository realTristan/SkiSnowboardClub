import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed left-1/2 top-10 z-50 flex w-max -translate-x-1/2 transform flex-row items-center justify-center space-x-7 border border-white/30 px-12 py-2.5 backdrop-blur-2xl">
      <Link
        href="/#"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-white duration-300 ease-in-out hover:scale-110"
      >
        HOME
      </Link>
      <Link
        href="/trips-and-tickets"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-white duration-300 ease-in-out hover:scale-110"
      >
        TRIPS AND TICKETS
      </Link>
      <Link
        href="/about-us"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-white duration-300 ease-in-out hover:scale-110"
      >
        ABOUT US
      </Link>
      <Link
        href="/contact"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-white duration-300 ease-in-out hover:scale-110"
      >
        CONTACT
      </Link>
    </nav>
  );
}
