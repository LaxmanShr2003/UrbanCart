import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../types/baseEntity";
import { User } from "../../User/model/user.model";
import { Product } from "../../product/model/product.model";

@Entity()
export class Cart extends BaseEntity {
  @Column({
    type: "int",
    default: 1,
    nullable: false,
  })
  quantity: number;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Product, (product) => product.carts, {
   
  })
  @JoinColumn({ name: "productId" })
  product: Product;
}
