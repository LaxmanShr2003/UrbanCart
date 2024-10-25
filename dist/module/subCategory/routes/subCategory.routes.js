"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRouters = void 0;
var validateToken_1 = require("../../../auth/validateToken");
var subCategory_schema_1 = require("../schema/subCategory.schema");
var zod_validation_1 = __importDefault(require("../../../middleware/zod.validation"));
var subCategory_controller_1 = require("../controller/subCategory.controller");
var subCategoryRouters = function (router) {
    router.post("/subcategory/create", zod_validation_1.default.requestParser({
        schema: subCategory_schema_1.subCreateCategorySchema,
        type: "Body",
        isFile: false,
    }), subCategory_controller_1.subCategoryController.createSubCategory);
    router.get("/subcategory/:id", (0, validateToken_1.validateToken)({ checkAdmin: true, checkEmployee: true }), zod_validation_1.default.requestParser({
        schema: subCategory_schema_1.subCategoryIdSchema,
        type: "Params",
    }), subCategory_controller_1.subCategoryController.findById);
    router.get("/subcategories", (0, validateToken_1.validateToken)({ checkAdmin: true, checkEmployee: true }), subCategory_controller_1.subCategoryController.findAll);
    router.patch("/subcategory/update/:id", (0, validateToken_1.validateToken)({ checkAdmin: true, checkEmployee: true }), zod_validation_1.default.requestParser({
        schema: subCategory_schema_1.subCreateCategorySchema,
        type: "Body",
        isFile: false,
    }, {
        schema: subCategory_schema_1.subCategoryIdSchema,
        type: "Params",
    }), subCategory_controller_1.subCategoryController.updateCategory);
};
exports.subCategoryRouters = subCategoryRouters;
//# sourceMappingURL=subCategory.routes.js.map