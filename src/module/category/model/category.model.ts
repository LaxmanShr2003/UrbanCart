import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../../types/baseEntity";
import { SubCategory } from "../../subCategory/model/subCategory.model";

@Entity()
export class Category extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  categoryName: string;
  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  categoryDescription: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {

  })
  subCategories: SubCategory[];
}
