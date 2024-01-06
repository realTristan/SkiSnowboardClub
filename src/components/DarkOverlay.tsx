import { cn } from "@/lib/utils/cn";

export default function DarkOverlay({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("fixed inset-0 bg-slate-900 opacity-90", className)} />
  );
}
