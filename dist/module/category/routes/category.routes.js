"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouters = void 0;
var category_schema_1 = require("../schema/category.schema");
var zod_validation_1 = __importDefault(require("../../../middleware/zod.validation"));
var category_controller_1 = require("../controller/category.controller");
var categoryRouters = function (router) {
    router.post("/category/create", zod_validation_1.default.requestParser({
        schema: category_schema_1.createCategorySchema,
        type: "Body",
        isFile: false,
    }), category_controller_1.categoryController.createCategory);
    router.get("/category/:id", zod_validation_1.default.requestParser({
        schema: category_schema_1.CategoryIdSchema,
        type: "Params",
    }), category_controller_1.categoryController.findById);
    router.get("/categories", category_controller_1.categoryController.findAll);
    router.patch("/category/update/:id", zod_validation_1.default.requestParser({
        schema: category_schema_1.createCategorySchema,
        type: "Body",
        isFile: false,
    }, {
        schema: category_schema_1.CategoryIdSchema,
        type: "Params",
    }), category_controller_1.categoryController.updateCategory);
};
exports.categoryRouters = categoryRouters;
//# sourceMappingURL=category.routes.js.map