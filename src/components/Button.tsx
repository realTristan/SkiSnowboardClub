import { cn } from "@/utils/cn";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface ButtonProps {
  className?: string;
  link?: boolean;
  href?: string;
  onClick?: (event: any) => void;
}
export default function Button(
  props: PropsWithChildren<ButtonProps>,
): JSX.Element {
  return props.link ? (
    <Link
      href={props.href || "#"}
      onClick={(e) => props.onClick && props.onClick(e)}
      className={cn(
        props.className,
        "btn border border-black px-10 py-3 text-sm duration-300 ease-in-out hover:bg-black hover:text-white",
      )}
    >
      {props.children}
    </Link>
  ) : (
    <button
      onClick={(e) => props.onClick && props.onClick(e)}
      className={cn(
        props.className,
        "btn border border-black px-10 py-3 text-sm duration-300 ease-in-out hover:bg-black hover:text-white",
      )}
    >
      {props.children}
    </button>
  );
}
