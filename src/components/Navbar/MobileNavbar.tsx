import { cn } from "@/lib/utils/cn";
import { type NavbarProps } from "./Navbar";
import Link from "next/link";
import { useState, type Dispatch, type SetStateAction } from "react";

/**
 * Mobile navbar component
 * @param props Navbar props
 * @returns JSX.Element
 */
export default function MobileNavbar(props: NavbarProps): JSX.Element {
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
interface MobileMenuBarsProps {
  className?: string;
  dark?: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function MobileMenuBars(props: MobileMenuBarsProps): JSX.Element {
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
interface MobileMenuDropDownProps {
  className?: string;
  dark?: boolean;
}
function MobileMenuDropDown(props: MobileMenuDropDownProps): JSX.Element {
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
