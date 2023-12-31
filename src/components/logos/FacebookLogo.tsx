import { cn } from "@/lib/utils/cn";
import FacebookSVG from "../svgs/Facebook";

export default function FacebookLogo(props: {
  className?: string;
  dark?: boolean;
}): JSX.Element {
  return (
    <a
      href="https://www.facebook.com/groups/1472509333058855"
      className={cn(props.className)}
    >
      <FacebookSVG className={props.dark ? "fill-black" : "fill-white"} />
    </a>
  );
}
