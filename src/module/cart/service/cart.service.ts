import ORMHelper from "../../../Helpers/ORMHelper";
import { cartIdSchemaType, cartSchemaType } from "../schema/cart.schema";
import { cartRepository } from "../repository/cart.repository";
import Exception from "../../../Helpers/ExceptionHandler";
export const cartService = {
  addProduct: async (userId: string, cartData: cartSchemaType) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const { productId, quantity } = cartData;
      let isProductExists = await cartRepository.findByProductIdAndUserId({
        runner,
        userId,
        cartData,
      });
      let result;
      if (isProductExists) {
        if (cartData.quantity < 1)
          throw new Error("minimum quantity should be one");
        isProductExists.quantity = cartData.quantity;
        await cartRepository.save({ runner, cart: isProductExists });
      } else {
        result = await cartRepository.addCart({
          runner,
          userId,
          data: { productId, quantity },
        });
      }
      return result;
    } catch (error) {
      throw error;
    } finally {
      runner.release();
    }
  },
  deleteCartItem: async (userId:string,cartId) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      console.log(userId)
      const iscartItemExists = await cartRepository.findCartById({
        runner,
        userId,
        id: cartId,
      });
      if (!iscartItemExists) throw new Exception("No cart item found", 404);
      const response = await cartRepository.delete({ runner, id: cartId });
      return response;
    } catch (error) {
      throw error;
    }
  },

  findCartItem: async(userId:string,cartId)=>{
     const runner = await ORMHelper.createQueryRunner();
     try {
       const iscartItemExists = await cartRepository.findCartById({
         runner,
         userId,
         id: cartId,
       });
       if (!iscartItemExists) throw new Exception("No cart item found", 404);
       const response = await cartRepository.findCartById({ runner, userId,id: cartId });
       return response;
     } catch (error) {
       throw error;
     }
  }
};
