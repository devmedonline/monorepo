import { type ClassValue as ClsxClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ClassValue = ClsxClassValue;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
