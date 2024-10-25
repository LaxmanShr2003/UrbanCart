import { BeforeInsert, UpdateDateColumn } from "typeorm";
import { CreateDateColumn } from "typeorm";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryColumn({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

}
