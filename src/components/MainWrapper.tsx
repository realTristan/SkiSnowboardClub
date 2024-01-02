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
        "flex min-h-screen w-screen min-w-full items-center justify-center",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
