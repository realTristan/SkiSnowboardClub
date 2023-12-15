import { Permission } from "@/lib/types";
import { cn } from "@/utils/cn";

export default function DashboardButton(props: {
  permissions: Permission[];
}): JSX.Element {
  const isDisabled: boolean = props.permissions.length === 0;

  return (
    <button
      disabled={isDisabled}
      onClick={() => {
        window.location.href = "/dashbaord";
      }}
      className={cn(
        !isDisabled ? "btn" : "",
        "border border-black px-10 py-3 text-sm duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50",
      )}
    >
      Dashboard
    </button>
  );
}
