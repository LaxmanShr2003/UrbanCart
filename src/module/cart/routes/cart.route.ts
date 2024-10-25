import { Router } from "express";
import { validateToken } from "../../../auth/validateToken";
import ZOD from "../../../middleware/zod.validation";
import { cartIdSchema, cartSchema } from "../schema/cart.schema";
import { cartController } from "../controller/cart.controller";

export const cartRoute = (router: Router) => {
  router.post(
    "/cart",
    validateToken({ checkCustomer: true }),
    ZOD.requestParser({
      schema: cartSchema,
      type: "Body",
    }),
    cartController.addToCart
  );

  router.delete(
    "/cart/:id",
    validateToken({ checkCustomer: true }),
    ZOD.requestParser({
      schema: cartIdSchema,
      type: "Params",
    }),
    cartController.deleteCartItem
  );

  router.get(
    "/cart/:id",
    //   validateToken({ checkCustomer: true }),
    ZOD.requestParser({
      schema: cartIdSchema,
      type: "Params",
    }),
    cartController.findCartItem
  );
};
