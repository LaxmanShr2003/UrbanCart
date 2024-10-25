import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../types/baseEntity";
import { OrderDetail } from "../../orderDetails/model/orderDetails.model";
import { Payment } from "../../payment/model/payment.model";
import { User } from "../../User/model/user.model";
import { join } from "path";

export enum OrderStatus {
  "PENDING" = "PENDING",
  "DELIVERED" = "DELIVERED",
  "ONTHEWAY" = "ONTHEWAY",
}

@Entity()
export class Order extends BaseEntity {
  @Column({
    type: "varchar",
    nullable: false,
  })
  shippingAddress: string;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    nullable: false,
  })
  orderStatus: string;

  @Column({
    type: "decimal",
    precision: 6,
    scale: 2,
    nullable: false,
  })
  totalAmount: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne(()=>Payment,payment=>payment.orders)
  @JoinColumn({name:"paymentId"})
  payment:Payment

  @ManyToOne(()=>User,user=>user.orders)
  @JoinColumn({name:"userId"})
  user:User
}
