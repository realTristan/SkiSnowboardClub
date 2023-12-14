import { cn } from "@/utils/cn";
import Image from "next/image";

export default function GuelphLogo(props: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <Image
      className={cn(props.className)}
      src={
        props.dark
          ? "/images/guelph-logo-black.png"
          : "/images/guelph-logo-white.png"
      }
      alt="..."
      width={60}
      height={60}
    />
  );
}
