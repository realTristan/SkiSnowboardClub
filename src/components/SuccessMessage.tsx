import { type ReactNode } from "react";

/**
 * Success message component
 * @returns JSX.Element
 */
export default function SuccessMessage({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <p className="text-center text-sm font-light text-green-500 lg:text-base">
      {children}
    </p>
  );
}
