import { z } from "zod";

// Define enums for PaymentMethod and PaymentStatus
const PaymentMethod = z.enum([ "KHALTI", "ESEWA","COD"]);
const PaymentStatus = z.enum(["PENDING", "COMPLETED", "FAILED"]);
const OrderStatus = z.enum(["PENDING","ONTHEWAY","DELIVERED"])

// Payment schema
const PaymentSchema = z.object({
  paymentMethod: PaymentMethod,
  paymentStatus: PaymentStatus.optional(),
  pidx: z.string().optional(),
});

// OrderDetails schema (items)
const OrderDetailsSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
  productId: z.string(), // Assuming it's a string; modify according to your model
});

// Main Order schema
export const OrderJoinSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits long"), // Validate length or format
  shippingAddress: z.string().min(1, "Shipping address cannot be empty"),
  totalAmount: z.number().min(0, "Total amount must be a positive number"),
  payment: PaymentSchema,
  items: z
    .array(OrderDetailsSchema)
    .min(1, "Order must contain at least one item"),
});

 const OrderSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits long"), // Validate length or format
  shippingAddress: z.string().min(1, "Shipping address cannot be empty"),
  orderStatus:OrderStatus,
  totalAmount: z.number().min(0, "Total amount must be a positive number"),
  paymentid:z.string(),
  userId:z.string()
});

export type OrderJoinSchemaType = z.infer<typeof OrderJoinSchema>;
export type PaymentSchemaType = z.infer<typeof PaymentSchema>;
export type OrderDetailSchemaType = z.infer<typeof OrderDetailsSchema>;

export type OrderSchemaType = z.infer<typeof OrderSchema>;
