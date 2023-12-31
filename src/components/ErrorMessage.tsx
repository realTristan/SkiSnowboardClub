import { type ReactNode } from "react";

/**
 * Error message component
 * @returns JSX.Element
 */
export default function ErrorMessage({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <p className="text-center text-sm font-light text-red-500 lg:text-base">
      {children}
    </p>
  );
}
