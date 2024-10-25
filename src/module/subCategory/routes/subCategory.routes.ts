import { Router } from "express";
import { validateToken } from "../../../auth/validateToken";
import ZOD from "../../../middleware/zod.validation";
import {
  createSubCategorySchema,
  subCategoryIdSchema,
} from "../schema/subCategory.schema";
import { SubCategoryController } from "../controller/subCategory.controller";

export const subCategoryRoutes = (router: Router) => {
  router.post(
    "/subcategory/create",
    // validateToken({checkAdmin:true,checkEmployee:true}),
    ZOD.requestParser({
      schema: createSubCategorySchema,
      type: "Body",
    }),
    SubCategoryController.createSubCategory
  );
  router.get(
    "/subcategory/:id",
    //  validateToken({checkAdmin:true,checkEmployee:true}),
    ZOD.requestParser({
      schema: subCategoryIdSchema,
      type: "Params",
    }),
    SubCategoryController.getById
  );

  router.get(
    "/subCategories",
    //  validateToken({checkAdmin:true,checkEmployee:true}),
    SubCategoryController.findAll
  );

  router.patch(
    "/subcategory/update/:id",
    //  validateToken({checkAdmin:true,checkEmployee:true}),

    ZOD.requestParser(
      {
        schema: createSubCategorySchema,
        type: "Body",
      },
      {
        schema: subCategoryIdSchema,
        type: "Params",
      }
    ),

    SubCategoryController.updateSubCategory
  );

  router.delete(
    "/subcategory/:id",
    //  validateToken({checkAdmin:true,checkEmployee:true}),
    ZOD.requestParser({
      schema: subCategoryIdSchema,
      type: "Params",
    }),
    SubCategoryController.deleteSubCategory
  );
};
