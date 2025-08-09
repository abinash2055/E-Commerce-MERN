import { z } from "zod";

export const zSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password must be at most 64 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must include at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must include at least one special character",
    }),

  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),

  otp: z.string().regex(/^\d{6}$/, {
    message: "OTP must be 6 digits number",
  }),

  _id: z.string().min(3, "_id is required."),

  alt: z.string().min(3, "Alt is required."),

  title: z.string().min(3, "Title is required."),
  
  slug: z.string().min(3, "Slug is required."),

  category: z.string().min(3, "Category is required."),
  mrp: z.union([
    z.number().positive("Expexted positive value, received negative."),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),

  sellingPrice: z.union([
    z.number().positive("Expexted positive value, received negative."),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),

  discountPercentage: z.union([
    z.number().positive("Expexted positive value, received negative."),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),

  description: z.string().min(3, 'Description is required'),
  media: z.array(z.string()),

  product: z.string().min(3, 'Product is required.'),
  color: z.string().min(3, 'Color is required.'),
  size: z.string().min(1, 'Size is required.'),
  sku: z.string().min(3, 'SKU is required.')
});
