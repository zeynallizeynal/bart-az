import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify, { type Config } from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitize = (dirty: string, opts?: Config) => {
  return DOMPurify.sanitize(dirty, {
    KEEP_CONTENT: true,
    ALLOWED_TAGS: [
      "b",
      "i",
      "strong",
      "ul",
      "li",
      "ol",
      "del",
      "s",
      "u",
      "em",
      "br",
      "hr",
      "p",
      "span",
      "br",
    ],
    ...opts,
  });
};

export function formatFileSize(value: number) {
  if (value < 1024) return `${value} B`;
  else if (value < 1048576) return `${(value / 1024).toFixed(2)} KB`;
  else return `${(value / 1048576).toFixed(2)} MB`;
}
