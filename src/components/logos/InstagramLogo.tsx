import { cn } from "@/utils/cn";
import InstagramSVG from "../svgs/Instagram";

export default function InstagramLogo(props: {
  className?: string;
  dark?: boolean;
}): JSX.Element {
  return (
    <a
      href="https://www.instagram.com/uogskiandboard"
      className={cn(props.className)}
    >
      <InstagramSVG className={props.dark ? "fill-black" : "fill-white"} />
    </a>
  );
}
