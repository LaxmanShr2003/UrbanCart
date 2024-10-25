import { z } from "zod";

export const createSubCategorySchema = z.object({
  subCategoryName: z
    .string({ required_error: "Subcategory name is required" })
    .min(3, { message: "Subcategory name cannot be less than 3 characters" }),

  subCategoryDescription: z.string().optional(),
  categoryId: z.string({required_error:"Category id is required"})
});

export const subCategoryIdSchema = z
  .object({
    id: z.string({ required_error: "Subcategory id is required" }),
  })
  

export type subCategorySchemaType = z.infer<typeof createSubCategorySchema>;
export type subCategoryIDSchemaType = z.infer<typeof subCategoryIdSchema>;
