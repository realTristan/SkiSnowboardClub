import { cn } from "@/utils/cn";
import Image from "next/image";

export default function GuelphLogo(props: { className: string }) {
  return (
    <Image
      className={cn(props.className)}
      src="/images/guelph-logo-1.png"
      alt="..."
      width={60}
      height={60}
    />
  );
}
