import { cn } from "@/lib/utils/cn";
import { type NavbarProps } from "./Navbar";
import Link from "next/link";

/**
 * Default navbar component
 * @param props Navbar props
 * @returns JSX.Element
 */
export default function DefaultNavbar(props: NavbarProps): JSX.Element {
  const lightClassName = "border-white/30 text-white";
  const darkClassName = "border-black text-black";
  const centered = "transform left-1/2 -translate-x-1/2";

  return (
    <nav
      className={cn(
        "fixed left-10 top-10 z-40 flex w-max flex-row items-center justify-center space-x-7 border px-12 py-2.5 backdrop-blur-2xl",
        props.dark ? darkClassName : lightClassName,
        props.centered ? centered : "",
        props.className,
      )}
    >
      <Link
        href="/#"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:scale-110"
      >
        HOME
      </Link>
      <Link
        href="/trips-and-tickets"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:scale-110"
      >
        TRIPS AND TICKETS
      </Link>
      <Link
        href="/about-us"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:scale-110"
      >
        ABOUT US
      </Link>
      <Link
        href="/contact"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:scale-110"
      >
        CONTACT
      </Link>
      <Link
        href="/account"
        className="btn cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:scale-110"
      >
        ACOUNT
      </Link>
    </nav>
  );
}
