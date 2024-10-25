import { Request, Response, NextFunction } from "express";
import { OrderJoinSchemaType } from "../schema/order.schema";
import { orderService } from "../service/order.service";
import { formatMessage } from "../../../lib/messageFormater";

export const orderController = {
  addOrder: async (
    req: Request<{}, {}, OrderJoinSchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.accessToken.id;
      const orderData: OrderJoinSchemaType = req.body;
      const response = await orderService.addOrder(userId, orderData);
      res
        .status(201)
        .json(formatMessage(true, response, "successfully ordered product"));
    } catch (error) {
      next(error);
    }
  },
};
