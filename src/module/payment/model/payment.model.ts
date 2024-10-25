import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../../types/baseEntity";
import { Order } from "../../order/model/order.model";

export enum PaymentStatus {
  "PENDING" = "PENDING",
  "COMPLETED" = "COMPLETED",
  "FAILED" = "FAILED",
}
export enum PaymentMethod {
  "KHALTI"="KHALTI",
  "ESEWA"="ESEWA",
  "COD"="COD"
}


@Entity()
export class Payment extends BaseEntity {
  @Column({
    type: "enum",
    enum: PaymentMethod.COD,
    nullable: false,
  })
  paymentMethod: string;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  
  })
  paymentStatus: string;

  @Column({
    type: "varchar",
    nullable:true
  })
  pidx: string;


  @OneToMany(()=>Order,order=>order.payment)
  orders:Order[]
}
