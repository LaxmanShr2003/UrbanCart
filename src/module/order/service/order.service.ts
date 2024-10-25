import axios from "axios";
import Exception from "../../../Helpers/ExceptionHandler";
import ORMHelper from "../../../Helpers/ORMHelper";
import { orderDetailRepository } from "../../orderDetails/repository/orderDetail.repository";
import { PaymentMethod } from "../../payment/model/payment.model";
import { paymentRepository } from "../../payment/repository/payment.repository";
import { orderRepository } from "../repository/order.repository";
import {
  OrderDetailSchemaType,
  OrderJoinSchemaType,
} from "../schema/order.schema";

export const orderService = {
  addOrder: async (userId: string, data: OrderJoinSchemaType) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
        const {totalAmount}:OrderJoinSchemaType = data;
      await runner.startTransaction();
      const orderResponse = await orderRepository.add({ runner, userId, data });
      if (!orderResponse) throw new Exception("Unable to add order data", 400);

      const paymentResponse = await paymentRepository.addPayment({
        runner,
        data: {
          paymentMethod: data.payment.paymentMethod,
          paymentStatus: data.payment.paymentStatus,
          pidx: data.payment.pidx,
        },
      });
      if (!paymentResponse)
        throw new Exception("Unable to add payment data", 400);

      let orderDetailResponse: OrderDetailSchemaType;
      for (let i = 0; i < data.items.length; i++) {
        orderDetailResponse = await orderDetailRepository.addOrderDetail({
          runner,
          orderId: orderResponse.id,
          data: {
            quantity: data.items[i].quantity,
            productId: data.items[i].productId,
          },
        });
      }
      if (!orderDetailResponse)
        throw new Exception("Unable to add payment data", 400);

      if(data.payment.paymentMethod===PaymentMethod.KHALTI){

            const data = {
              return_url: "http://localhost:8000/success",
              website_url: "http://localhost:8000/",
              amount: totalAmount * 100,
              purchase_order_id: orderResponse.id,
              purchase_order_name: 'orderName_'+orderResponse.id,
            };
            const response = await axios.post(
              "https://a.khalti.com/api/v2/epayment/initiate/",
              data,
              {
                headers: {
                  Authorization: "4aacc2a896c64179a49e0089047566fd",
                },
              }
            );
            console.log(response);


      }else if(data.payment.paymentMethod==PaymentMethod.COD){
        return `payment done successfully`

      }

      await runner.commitTransaction();
    } catch (error) {
      await runner.rollbackTransaction();
      throw error;
    } finally {
      runner.release();
    }
  },
};
