import { unsyncFromPublic } from "../../../Helpers/unsync";
import { Unique } from "../../../lib/hash";
import { Runner } from "../../../types/global";
import { SubCategory } from "../../subCategory/model/subCategory.model";
import { Product } from "../model/product.model";
import {
  createProductSchema,
  productCreateType,
  productIdType,
} from "../schema/product.schema";

export const ProductRepository = {
  create: async ({ runner, data }: Runner & { data: productCreateType }) => {
    const repo = runner.manager.getRepository(Product);
    const subCategoryRepo = runner.manager.getRepository(SubCategory);
    try {
      const id = data.subCategoryId;
      const subCategory = await subCategoryRepo.findOne({
        where: {
          id: id,
        },
      });

      const response = await repo.save({
        id: Unique(),
        productName: data.productName,
        productDescription: data.productDescription,
        price: data.price,
        productImage: "",
        isAvailable: true,
        subCategory: { id: data.subCategoryId },
      });
      return response;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },

  findAll: async ({ runner }: Runner) => {
    const repo = runner.manager.getRepository(Product);
    try {
      const response = await repo.find({
        relations: { subCategory: true },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  find: async ({ runner, id }: Runner & { id: productIdType }) => {
    const repo = runner.manager.getRepository(Product);
    try {
      const response = await repo.findOne({
        where: { id: id.id },
        relations: { subCategory: true },
      });
      return response;
    } catch (error) {}
  },
  findByName: async ({
    runner,
    productName,
  }: Runner & { productName: string }) => {
    const repo = runner.manager.getRepository(Product);
    try {
      const response = await repo.findOne({
        where: {
          productName: productName,
        },
      });
      return response ? true : false;
    } catch (error) {
      throw error;
    }
  },

  remove: async ({ runner, id }: Runner & Pick<Product, "id">) => {
    const repo = runner.manager.getRepository(Product);
    try {
      const product = await repo.findOne({ where: { id: id } });
      const response = await repo.delete(id);

      unsyncFromPublic(product.productImage);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async ({
    runner,
    id,
    data: { subCategoryId, ...data },
  }: Runner & { id: productIdType; data: productCreateType }) => {
    const repo = runner.manager.getRepository(Product);
    const subCategoryRepo = runner.manager.getRepository(SubCategory);
    try {
      const subCategory = await subCategoryRepo.findOne({
        where: {
          id: subCategoryId,
        },
      });

      const updatedData = await repo.update(id, {
        ...data,
        subCategory: { id: subCategoryId },
      });

      const response = await repo.findOne({
        where: {
          id: id.id,
        },
        relations: { subCategory: true },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
