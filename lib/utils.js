import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const sizes = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "2XL", value: "2XL" },
  { label: "3XL", value: "3XL" },
];

export const sortings = [
  { label: "Default Sorting", value: "default_sorting" },
  { label: "Ascending Order", value: "asc" },
  { label: "Descending Order", value: "desc" },
  { label: "Price: Low To High", value: "price_low_high" },
  { label: "Price: High To Low", value: "price_high_low" },
];

export const orderStatus = [
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "unverified", value: "unverified" },
];
