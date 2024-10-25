import ORMHelper from "../../../Helpers/ORMHelper";
import { Unique } from "../../../lib/hash";
import { Runner } from "../../../types/global";
import { subCategoryIDSchemaType } from "../../subCategory/schema/subCategory.schema";
import { UserCreateSchemaType } from "../../User/schema/user.schema";
import { Category } from "../model/category.model";
import {
  CategoryIDSchemaType,
  CategorySchemaType,
} from "../schema/category.schema";

export const categoryRepository = {
  create: async ({ runner, data }: Runner & { data: CategorySchemaType }) => {
    const repo = runner.manager.getRepository(Category);
    try {
      const response = await repo.save({
        id: Unique(),
        ...data,
        
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  findByName: async ({
    runner,
    categoryName,
  }: Runner & { categoryName: string }) => {
    const repo = runner.manager.getRepository(Category);
    try {
      const response = await repo.findOne({
        where: {
          categoryName: categoryName,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  findById: async ({ runner, id }: Runner & { id: subCategoryIDSchemaType }) => {
    const repo = runner.manager.getRepository(Category);
    try {
     
      const response = await repo.findOne({
        where: {
          id: id.id,
        },

      });
      console.log(response)
      return response;
    } catch (error) {
      throw error;
    }
  },

  find: async ({ runner }: Runner) => {
    const repo = runner.manager.getRepository(Category);
    try {
      const response = await repo.find();
      return response;
    } catch (error) {
      throw error;
    }
  },

  remove: async ({ runner, id }: Runner & { id: string }) => {
    const repo = runner.manager.getRepository(Category);
    try {
      const response = await repo.delete(id);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async ({
    runner,
    id,
    data,
  }: Runner & { id: string; data: CategorySchemaType }) => {
    const repo = runner.manager.getRepository(Category);
    try {
      const updatedResult = await repo.update({ id: id }, { ...data });
      const response = await repo.findOne({
        where: {
          id: id,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
};
