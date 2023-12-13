import { cn } from "@/utils/cn";
import InstagramSVG from "../svgs/Instagram";

export default function InstagramLogo(props: {
  className: string;
}): JSX.Element {
  return (
    <a
      href="https://www.instagram.com/uogskiandboard"
      className={cn(props.className)}
    >
      <InstagramSVG />
    </a>
  );
}
