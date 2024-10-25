import { Request, Response, NextFunction } from "express";
import { cartIdSchemaType, cartSchemaType } from "../schema/cart.schema";
import { cartService } from "../service/cart.service";
import { formatMessage } from "../../../lib/messageFormater";

export interface CartData {
  userId?: string;
  productId: string;
  quantity: number;
}

export const cartController = {
  addToCart: async (
    req: Request<{}, {}, cartSchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.accessToken.id;
      const data = req.body;
      const response = await cartService.addProduct(userId, data);
      res
        .status(200)
        .json(formatMessage(true, response, "Successfully added to cart"));
    } catch (error) {
      next(error);
    }
  },

  deleteCartItem: async (
    req: Request<cartIdSchemaType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.accessToken.id;
      const { id } = req.params;
      const response = await cartService.deleteCartItem(userId,id);
      res
        .status(201)
        .json(formatMessage(true, "Cart item data deleted successfully"));
    } catch (error) {
      next(error);
    }
  },

  findCartItem: async (
    req: Request<cartIdSchemaType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.accessToken.id;
      const { id } = req.params;
      const response = await cartService.findCartItem(userId,id);
      res
        .status(201)
        .json(formatMessage(true, response,"Cart item data deleted successfully"));
    } catch (error) {
      next(error);
    }
  },
};
