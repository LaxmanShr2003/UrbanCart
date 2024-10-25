import { Unique } from "../../../lib/hash";
import { Runner } from "../../../types/global";
import { PaymentSchemaType } from "../../order/schema/order.schema";
import { Payment } from "../model/payment.model";

export const paymentRepository = {
  addPayment: async ({
    runner,
    data,
  }: Runner & { data: PaymentSchemaType }) => {
    const repo = runner.manager.getRepository(Payment);
    try {
      const response = await repo.save({
        id: Unique(),
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus,
        pidx: data.pidx,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
