import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Concatenate classNames with tailwind-merge dedup. shadcn convention. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
