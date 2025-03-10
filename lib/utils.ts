import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using `clsx` and merges Tailwind CSS class names using `twMerge`.
 *
 * @param inputs - An array of values that can represent class names. This can include strings, arrays, or objects.
 * @returns A single merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
