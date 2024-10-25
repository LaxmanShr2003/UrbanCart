import {z} from 'zod'


export const cartSchema=z.object({
    productId:z
    .string({required_error:"Product id is required"}),

    // userId:z
    // .string({required_error:"User id is required"}),

    quantity:z
    .number({required_error:"Quantity is required"})
});

export const cartIdSchema = z.object({
    id:z
    .string({required_error:"Cart id is required"})
})


export  type cartSchemaType = z.infer<typeof cartSchema>;
export  type cartIdSchemaType = z.infer<typeof cartIdSchema>;