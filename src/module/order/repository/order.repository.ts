import { Unique } from "../../../lib/hash";
import { Runner } from "../../../types/global";
import { Order } from "../model/order.model";
import { OrderSchemaType } from "../schema/order.schema";

export const orderRepository = {
  add: async ({
    runner,
    data,
    userId,
  }: Runner & { userId: string; data: OrderSchemaType }) => {
    const orderRepo = runner.manager.getRepository(Order);

    try {
      const orderResponse = await orderRepo.save({
        id: Unique(),
        phoneNumber: data.phoneNumber,
        shippingAddress: data.shippingAddress,
        orderStatus:data.orderStatus,
        totalAmount: data.totalAmount,
        user: { id: userId },
        payment: { id: data.paymentid },
      });
      return orderResponse;
    } catch (error) {
      throw error;
    }
  },
};
