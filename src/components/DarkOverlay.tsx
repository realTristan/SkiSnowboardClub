import { cn } from "@/lib/utils/cn";

export default function DarkOverlay({className}: {className?: string}): JSX.Element {
    return (
      <div className={cn("fixed inset-0 -z-10 bg-slate-900 opacity-90", className)}/>
    )
}