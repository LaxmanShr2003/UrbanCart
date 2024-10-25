import { Unique } from "../../../lib/hash";
import { Runner } from "../../../types/global";
import { Cart } from "../model/cart.model";
import { cartIdSchemaType, cartSchemaType } from "../schema/cart.schema";

export const cartRepository = {
  addCart: async ({
    runner,
    userId,
    data: { productId, ...data },
  }: Runner & { userId: string; data: cartSchemaType }) => {
    const repo = runner.manager.getRepository(Cart);
    try {
      const response = await repo.save({
        id: Unique(),
        product: { id: productId },
        user: { id: userId },
        ...data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  save: async ({ runner, cart }: Runner & { cart: Cart }) => {
    const repo = runner.manager.getRepository(Cart);
    try {
      return await repo.update({ id: cart.id }, { ...cart });
    } catch (error) {
      throw error;
    }
  },

  findByProductIdAndUserId: async ({
    runner,
    userId,
    cartData: { productId, ...cartData },
  }: Runner & { userId: string; cartData: cartSchemaType }) => {
    const repo = runner.manager.getRepository(Cart);
    try {
      const response = await repo.findOne({
        where: {
          user: { id: userId },
          product: { id: productId },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  delete: async ({ runner, id }: Runner & { id: cartIdSchemaType }) => {
    const repo = runner.manager.getRepository(Cart);
    try {
      const response = await repo.delete(id);
      return response;
    } catch (error) {
      throw error;
    }
  },

  findCartById: async ({ runner, id ,userId}: Runner & { userId:string,id: cartIdSchemaType }) => {
    const repo = runner.manager.getRepository(Cart);
    try {
      const response = await repo.findOne({
        where: {
          user:{id:userId},
          id: id.id,
        },
        relations: {
          user: true,
          product: {
            subCategory:{
              category:true
            }
          }
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
