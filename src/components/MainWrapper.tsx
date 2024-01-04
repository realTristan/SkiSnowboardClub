import { cn } from "@/lib/utils/cn";
import { type CSSProperties, type PropsWithChildren } from "react";

interface MainWrapperProps {
  className?: string;
  style?: CSSProperties;
}
export default function MainWrapper(
  props: PropsWithChildren<MainWrapperProps>,
): JSX.Element {
  return (
    <div
      style={props.style}
      className={cn(
        "flex min-h-screen w-screen min-w-full items-center justify-center",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
