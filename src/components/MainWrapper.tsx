import { cn } from "@/lib/utils/cn";
import { type PropsWithChildren } from "react";

interface MainWrapperProps {
  className?: string;
}
export default function MainWrapper(
  props: PropsWithChildren<MainWrapperProps>,
): JSX.Element {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center w-screen min-w-full justify-center",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
