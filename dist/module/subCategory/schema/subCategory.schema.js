"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryIdSchema = exports.subCreateCategorySchema = void 0;
var zod_1 = require("zod");
exports.subCreateCategorySchema = zod_1.z.object({
    subCategoryName: zod_1.z
        .string({ required_error: "Category name is required" })
        .min(3, { message: "Category name cannot be less than 3 characters" }),
    categoryId: zod_1.z
        .string({ required_error: "Category id is required" }),
    subCategoryDescription: zod_1.z.string().optional(),
});
exports.subCategoryIdSchema = zod_1.z.object({
    id: zod_1.z
        .string({ required_error: "Category id is required" }),
}).strict();
//# sourceMappingURL=subCategory.schema.js.map