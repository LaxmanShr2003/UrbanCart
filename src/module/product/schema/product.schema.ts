import { z } from "zod";

export const createProductSchema = z.object({
  productName: z
    .string({ required_error: "Product name is required" })
    .min(3, { message: "Product name must be a least 3 characters" }),

  productDescription: z.string({
    required_error: "Product Description is required",
  }),

  price: z.string({ required_error: "Product price is required" }),
  subCategoryId: z.string({ required_error: "Subcategory must be mentioned" }),


});

export const ProductIdSchema = z
  .object({
    id: z.string({ required_error: "Product id is required" }),
  })
  .strict();

export type productIdType = z.infer<typeof ProductIdSchema>;
export type productCreateType = z.infer<typeof createProductSchema>;
