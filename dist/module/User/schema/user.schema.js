"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.userIdScheama = exports.userSchema = void 0;
var zod_1 = require("zod");
var emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
exports.userSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: "First name is required" })
        .min(3, { message: "First name must be more than 3 characters" }),
    lastName: zod_1.z
        .string({ required_error: "Last name is required" })
        .min(3, { message: "Last name must be more than 3 characters" }),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .refine(function (email) { return emailRegex.test(email); }, {
        message: "Invalid email format",
    }),
    phoneNumber: zod_1.z
        .string({ required_error: "Phone number is required" })
        .max(10, { message: "Phone number must be 10 numbers" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .refine(function (password) { return passwordRegex.test(password); }, {
        message: "Password format invalid",
    }),
    address: zod_1.z.string({ required_error: "Address name is required" }),
    image: zod_1.z.string().optional(),
});
exports.userIdScheama = zod_1.z
    .object({
    id: zod_1.z.string(),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required!" })
        .refine(function (email) { return emailRegex.test(email); }, { message: "Wrong email format!" }),
    password: zod_1.z
        .string({ required_error: "Password is required!" })
        .refine(function (password) { return passwordRegex.test(password); }, { message: "Wrong password format!" }),
});
//# sourceMappingURL=user.schema.js.map