import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

/**
 * Combine (merge) tailwind strings
 * @param inputs Tailwind string inputs
 * @returns string
 */
export const cn = (...inputs: (string | undefined)[]) => twMerge(clsx(inputs));
