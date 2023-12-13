import { cn } from "@/utils/cn";
import FacebookSVG from "../svgs/Facebook";

export default function FacebookLogo(props: {
  className: string;
}): JSX.Element {
  return (
    <a
      href="https://www.facebook.com/groups/1472509333058855"
      className={cn(props.className)}
    >
      <FacebookSVG />
    </a>
  );
}
