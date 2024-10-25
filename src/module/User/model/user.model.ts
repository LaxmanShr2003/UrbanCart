import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserRole } from "../../../types/global";
import { BaseEntity } from "../../../types/baseEntity";
import { Cart } from "../../cart/model/cart.model";
import { Order } from "../../order/model/order.model";

@Entity()
export class User extends BaseEntity {
  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  firstName: string;
  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  image: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  address: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  phoneNumber: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: string;

  @BeforeInsert()
  hash() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  @OneToMany(()=>Cart,(cart)=>cart.user)
  carts:Cart[]

  @OneToMany(()=>Order,order=>order.user)
  orders:Order
}
