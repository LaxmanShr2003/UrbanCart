"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryIdSchema = exports.createCategorySchema = void 0;
var zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    categoryName: zod_1.z
        .string({ required_error: "Category name is required" })
        .min(3, { message: "Category name cannot be less than 3 characters" }),
    categoryDescription: zod_1.z.string().optional(),
});
exports.CategoryIdSchema = zod_1.z.object({
    id: zod_1.z
        .string({ required_error: "Category id is required" }),
}).strict();
//# sourceMappingURL=category.schema.js.map