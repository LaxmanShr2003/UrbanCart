import { Router } from "express";
import { validateToken } from "../../../auth/validateToken";
import ZOD from "../../../middleware/zod.validation";
import { orderController } from "../controller/order.controller";
import { OrderJoinSchema } from "../schema/order.schema";

export const orderRoutes = (router: Router) => {
  router.post(
    "/order/",
    validateToken({ checkCustomer: true }),
    ZOD.requestParser({
      schema: OrderJoinSchema,
      type: "Body",
    }),
    orderController.addOrder
  );
};
