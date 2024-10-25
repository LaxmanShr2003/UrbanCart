import { Router } from "express";
import { validateToken } from "../../../auth/validateToken";
import MulterHelper from "../../../middleware/multer";
import { productImages } from "../../../utils/user.profiles";
import ZOD from "../../../middleware/zod.validation";
import { createProductSchema, ProductIdSchema } from "../schema/product.schema";
import { productController } from "../controller/product.controller";

export const productRoute = (router: Router) => {
  router.post(
    "/product",
    //validateToken({ checkAdmin: true, checkEmployee: true }),
    MulterHelper.getstorage(process.env.ACCESS_PATH, {
      isFile: false,
      moduleName: "productImage",
    }).fields([...productImages]),
    ZOD.requestParser({
      schema: createProductSchema,
      type: "Body",
      isFile: false,
    }),
    productController.createProduct
  );

  router.get(
    "/products",
    // validateToken({
    //   checkAdmin: true,
    //   checkEmployee: true,
    //   checkCustomer: true,
    // }),
    productController.findAllProducts
  );

  router.get(
    "/product/:id",
    // validateToken({
    //   checkAdmin: true,
    //   checkEmployee: true,
    //   checkCustomer: true,
    // }),
    ZOD.requestParser({
      schema: ProductIdSchema,
      type: "Params",
    }),
    productController.findProduct
  );

  router.delete(
    "/product/:id",
    // validateToken({
    //   checkAdmin: true,
    //   checkEmployee: true,
    //   checkCustomer: true,
    // }),
    ZOD.requestParser({
      schema: ProductIdSchema,
      type: "Params",
    }),
    productController.removeProduct
  );

  router.patch(
    "/product/:id",
    // validateToken({
    //   checkAdmin: true,
    //   checkEmployee: true,

    // }),
    MulterHelper.getstorage(process.env.ACCESS_PATH, {
      isFile: false,
      moduleName: "productImage",
    }).fields([...productImages]),
    ZOD.requestParser(
      { schema: createProductSchema, type: "Body", isFile: false },
      {
        schema: ProductIdSchema,
        type: "Params",
      }
    ),
    productController.updateProduct
  );
};
