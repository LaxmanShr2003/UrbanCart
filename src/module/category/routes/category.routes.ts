import { Router } from "express";
import { validateToken } from "../../../auth/validateToken";
import { scheduler } from "timers/promises";
import {
  CategoryIdSchema,
  createCategorySchema,
} from "../schema/category.schema";
import ZOD from "../../../middleware/zod.validation";
import { categoryController } from "../controller/category.controller";

export const categoryRouters = (router: Router) => {
  router.post(
    "/category/create",
    // validateToken({ checkAdmin: true, checkEmployee: true }),
    ZOD.requestParser({
      schema: createCategorySchema,
      type: "Body",
      isFile: false,
    }),
    categoryController.createCategory
  );
  router.get(
    "/category/:id",
    // validateToken({ checkAdmin: true, checkEmployee: true }),
    ZOD.requestParser({
      schema: CategoryIdSchema,
      type: "Params",
    }),
    categoryController.findById
  );
  router.get(
    "/categories",
    // validateToken({ checkAdmin: true, checkEmployee: true }),
    categoryController.findAll
  );
  router.patch(
    "/category/update/:id",
    // validateToken({ checkAdmin: true, checkEmployee: true }),

    ZOD.requestParser(
      {
        schema: createCategorySchema,
        type: "Body",
        isFile: false,
      },
      {
        schema: CategoryIdSchema,
        type: "Params",
      }
    ),

    categoryController.updateCategory
  );
};
