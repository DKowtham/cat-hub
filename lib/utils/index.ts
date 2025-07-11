import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatJson(obj: any, indent: number = 2): string {
  return JSON.stringify(obj, null, indent);
}

export function getStatusCodeColor(code: number): string {
  if (code >= 200 && code < 300) return "text-green-600";
  if (code >= 300 && code < 400) return "text-yellow-600";
  if (code >= 400 && code < 500) return "text-red-600";
  if (code >= 500) return "text-red-800";
  return "text-gray-600";
}

export function getStatusCodeBadgeColor(code: number): string {
  if (code >= 200 && code < 300) return "bg-green-100 text-green-800";
  if (code >= 300 && code < 400) return "bg-yellow-100 text-yellow-800";
  if (code >= 400 && code < 500) return "bg-red-100 text-red-800";
  if (code >= 500) return "bg-red-200 text-red-900";
  return "bg-gray-100 text-gray-800";
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getEnvironmentVariable(
  key: string,
  defaultValue?: string
): string {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value || defaultValue!;
}

export function getPublicEnvironmentVariable(
  key: string,
  defaultValue?: string
): string {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Public environment variable ${key} is not set`);
  }
  return value || defaultValue!;
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
