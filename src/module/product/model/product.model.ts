import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "../../../types/baseEntity";
import { SubCategory } from "../../subCategory/model/subCategory.model";
import { Cart } from "../../cart/model/cart.model";
import { OrderDetail } from "../../orderDetails/model/orderDetails.model";

@Entity()
export class Product extends BaseEntity {
  @Column({
    type: "varchar",
    length: 200,
    nullable: false,
  })
  productName: string;

  @Column({
    type: "varchar",
    length: 500,
    nullable: true,
  })
  productDescription: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  price: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  productImage: string;

  @Column({
    type: "boolean",
    default: true,
    nullable: false,
  })
  isAvailable: boolean;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "subCategoryId" })
  subCategory: SubCategory;

  @OneToMany(() => Cart, (cart) => cart.product, {})
  carts: Cart[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product, {})
  orderDetails: OrderDetail[];
}
