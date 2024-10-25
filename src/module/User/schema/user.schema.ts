import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const userSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "First name must be more than 3 characters" }),

  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, { message: "Last name must be more than 3 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .refine((email) => emailRegex.test(email), {
      message: "Invalid email format",
    }),

  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .max(10, { message: "Phone number must be 10 numbers" }),

  password: z
    .string({ required_error: "Password is required" })
    .refine((password) => passwordRegex.test(password), {
      message: "Password format invalid",
    }),
  address: z.string({ required_error: "Address name is required" }),

  image: z.string().optional(),
});

export const userIdScheama = z
  .object({
    id: z.string(),
  });
  
export const LoginSchema = z.object({
  email:z
  .string({required_error:"Email is required!"})
  .refine((email)=>emailRegex.test(email),{message:"Wrong email format!"}),

  password: z
  .string({required_error:"Password is required!"})
  .refine((password)=>passwordRegex.test(password),{message:"Wrong password format!"}),
})

export type UserCreateSchemaType = z.infer<typeof userSchema>;
export type UserIdSchemaType = z.infer<typeof userIdScheama>;
export type UserLoginSchemaType = z.infer<typeof LoginSchema>;
