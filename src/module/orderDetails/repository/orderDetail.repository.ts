import { Unique } from "../../../lib/hash";
import { Runner } from "../../../types/global";
import { OrderDetailSchemaType } from "../../order/schema/order.schema";
import { OrderDetail } from "../model/orderDetails.model";

export const orderDetailRepository = {
  addOrderDetail: async ({
    runner,
    orderId,
    data,
  }: Runner & { orderId: string; data: OrderDetailSchemaType }) => {
    const repo = runner.manager.getRepository(OrderDetail);
    try {
      const response = await repo.save({
        id: Unique(),
        quantity: data.quantity,
        order: { id: orderId },
        product: { id: data.productId },
      });
      return response
    } catch (error) {
        throw error;
    }
  },
};
