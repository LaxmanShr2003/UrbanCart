import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../types/baseEntity";
import { Order } from "../../order/model/order.model";
import { Product } from "../../product/model/product.model";

@Entity()
export class OrderDetail extends BaseEntity {
  @Column({
    type: "int",
  })
  quantity: number;

  @ManyToOne(()=>Order,(order)=>order.orderDetails)
  @JoinColumn({name:"orderId"})
  order:Order

  @ManyToOne(()=>Product,product=>product.orderDetails)
  @JoinColumn({name:"productId"})
  product:Product
}
