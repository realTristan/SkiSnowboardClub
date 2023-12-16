import { cn } from "@/utils/cn";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface NavbarProps {
  centered?: boolean;
  className?: string;
  dark?: boolean;
}

/**
 * Navbar component
 * @param props Navbar props
 * @returns JSX.Element
 */
export default function Navbar(props: {
  centered?: boolean;
  className?: string;
  dark?: boolean;
}): JSX.Element {
  return (
    <>
      <DefaultNavbar
        centered={props.centered}
        className={cn("hidden flex-auto lg:flex", props.className)}
        dark={props.dark}
      />
      <MobileNavbar
        className={cn("lg:hidden", props.className)}
        dark={props.dark}
      />
    </>
  );
}

/**
 * Default navbar component
 * @param props Navbar props
 * @returns JSX.Element
 */
function DefaultNavbar(props: NavbarProps): JSX.Element {
  const lightClassName: string = "border-white/30 text-white";
  const darkClassName: string = "border-black text-black";
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

/**
 * Mobile navbar component
 * @param props Navbar props
 * @returns JSX.Element
 */
function MobileNavbar(props: NavbarProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={cn("flex flex-col", props.className)}>
      <MobileMenuBars
        dark={props.dark}
        open={open}
        setOpen={setOpen}
        className="z-[70]"
      />
      {open && <MobileMenuDropDown dark={props.dark} className="z-[60]" />}
    </div>
  );
}

/**
 * Menu bars component
 * @param props Menu bars props
 * @returns JSX.Element
 */
function MobileMenuBars(props: {
  className?: string;
  dark?: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const { open, dark, className, setOpen } = props;

  function Bar(props: { className?: string }): JSX.Element {
    return (
      <span
        className={cn(
          "h-0.5 rounded-full",
          open
            ? dark
              ? "bg-white"
              : "bg-black"
            : dark
              ? "bg-black"
              : "bg-white",
          props.className,
        )}
      ></span>
    );
  }

  return (
    <div
      onClick={() => setOpen(!open)}
      className={cn(
        "group fixed right-8 top-8 flex cursor-pointer flex-col items-end justify-end space-y-2.5 p-3",
        className,
      )}
    >
      <Bar
        className={
          open
            ? "w-10 translate-y-3.5 rotate-45 transform duration-300 ease-in-out group-hover:-rotate-45"
            : "w-10"
        }
      />
      <Bar className={open ? "opacity-0" : "w-10"} />
      <Bar
        className={
          open
            ? "w-10 -translate-y-[10px] -rotate-45 transform duration-300 ease-in-out group-hover:rotate-45"
            : "w-10"
        }
      />
    </div>
  );
}

/**
 * Mobile menu dropdown component
 * @param props Mobile menu dropdown props
 * @returns JSX.Element
 */
function MobileMenuDropDown(props: {
  className?: string;
  dark?: boolean;
}): JSX.Element {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 flex h-auto w-screen flex-col px-4 py-8",
        props.className,
        props.dark ? "bg-black" : "bg-white",
      )}
    >
      <Link
        href="/#"
        className={cn(
          "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:translate-x-4",
          props.dark ? "text-white" : "text-black",
        )}
      >
        HOME
      </Link>
      <Link
        href="/trips-and-tickets"
        className={cn(
          "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:translate-x-4",
          props.dark ? "text-white" : "text-black",
        )}
      >
        TRIPS AND TICKETS
      </Link>
      <Link
        href="/about-us"
        className={cn(
          "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:translate-x-4",
          props.dark ? "text-white" : "text-black",
        )}
      >
        ABOUT US
      </Link>
      <Link
        href="/contact"
        className={cn(
          "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:translate-x-4",
          props.dark ? "text-white" : "text-black",
        )}
      >
        CONTACT
      </Link>
      <Link
        href="/account"
        className={cn(
          "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest duration-300 ease-in-out hover:translate-x-4",
          props.dark ? "text-white" : "text-black",
        )}
      >
        ACOUNT
      </Link>
    </div>
  );
}
