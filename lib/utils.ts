import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceINR(amount: number | undefined | null): string {
  if (!amount || isNaN(amount)) return "₹ 0";

  if (amount >= 10000000) {
    // Crore
    return `₹ ${(amount / 10000000).toFixed(1)} Cr`;
  }

  if (amount >= 100000) {
    // Lakh
    return `₹ ${(amount / 100000).toFixed(0)} L`;
  }

  return `₹ ${amount.toLocaleString("en-IN")}`;
}
