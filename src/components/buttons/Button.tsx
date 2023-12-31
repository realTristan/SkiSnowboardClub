import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { PropsWithChildren } from "react";

type ButtonType = "button" | "submit" | "reset";
interface ButtonProps {
  className?: string;
  disabled?: boolean;
  dark?: boolean;
  type?: ButtonType;
  href?: string;
  target?: string;
  onClick?: (event: any) => void;
}
export default function Button(
  props: PropsWithChildren<ButtonProps>,
): JSX.Element {
  return (
    <button
      disabled={props.disabled}
      onClick={(e) => {
        props.onClick && props.onClick(e);

        if (props.href) {
          props.target === "_blank"
            ? window.open(props.href, "_blank")
            : (window.location.href = props.href);
        }
      }}
      className={cn(
        "btn flex flex-row items-center justify-center gap-2 border border-black px-10 py-3 text-left text-sm duration-300 ease-in-out disabled:opacity-50",
        props.dark
          ? "bg-black text-white hover:bg-white hover:text-black"
          : "text-black hover:bg-black hover:text-white",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}
