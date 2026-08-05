import { z } from "zod";

export const orderItemSchema = z.object({
  menuItemId: z.string().min(1, "menuItemId is required"),
  quantity: z.number().int().positive("quantity must be a positive integer"),
});

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(1, "Name is required").max(100),
  tableNumber: z.string().trim().min(1, "Table number is required").max(20),
  instructions: z.string().trim().max(500).optional().or(z.literal("")),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export const updateStatusSchema = z.object({
  status: z.enum(["RECEIVED", "PREPARING", "READY", "COMPLETED"]),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
