import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui Standard-Utility: kombiniert bedingte Klassen (clsx) und löst
 * Tailwind-Klassenkonflikte sauber auf (tailwind-merge).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
