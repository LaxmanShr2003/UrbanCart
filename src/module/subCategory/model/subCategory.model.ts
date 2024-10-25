import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../types/baseEntity";
import { Category } from "../../category/model/category.model";
import { Product } from "../../product/model/product.model";

@Entity()
export class SubCategory extends BaseEntity {
  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  subCategoryName: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: true,
  })
  subCategoryDescription: string;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    
  })
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @OneToMany(() => Product, (product) => product.subCategory,{
    onDelete:"CASCADE"
  })
  products: Product[];
}
