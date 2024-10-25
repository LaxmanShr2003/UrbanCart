import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z
    .string({ required_error: "Category name is required" })
    .min(3, { message: "Category name cannot be less than 3 characters" }),

  categoryDescription: z.string().optional(),
});

export const CategoryIdSchema =z.object({
    id:z
    .string({required_error:"Category id is required"}),
}).strict();


export type CategorySchemaType = z.infer<typeof createCategorySchema>;
export type CategoryIDSchemaType = z.infer<typeof CategoryIdSchema>;
