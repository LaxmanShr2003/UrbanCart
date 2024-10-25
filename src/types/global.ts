import { QueryRunner } from "typeorm";
import { PaymentMethod, PaymentStatus } from "../module/payment/model/payment.model";

export enum UserRole {
  "ADMIN" = "ADMIN",
  "CUSTOMER" = "CUSTOMER",
  "EMPLOYEE" = "EMPLOYEE",
}

export interface OrderData{
  phoneNumber:string,
  shippingAddress:string,
  totalAmount:number,
  paymentDetail:{
    paymentMethod:PaymentMethod,
    paymentStatus?:PaymentStatus,
    pidx?:string
  },
  items:OrderDetails[]
}
export interface OrderDetails{
  quantity:number,
  productId:string
}



export type AccessTokenpayload = {
  id: string;
  email: string;
  role: UserRole;
};

export type AccessToken = {
  payload: AccessTokenpayload;
  secretKey: string;
  exp?: string;
};

declare global {
  namespace Express {
    interface Request {
      accessToken: AccessTokenpayload;
    }
  }
}

export type Runner = {
  runner: QueryRunner;
};
