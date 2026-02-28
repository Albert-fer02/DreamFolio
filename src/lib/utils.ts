import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for conditional class name handling
 * with automatic Tailwind class conflict resolution.
 * 
 * @example
 * cn("bg-blue-500 p-4", className) // If className="p-2", result is "bg-blue-500 p-2"
 * cn("text-white", { "opacity-50": disabled })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
