import { Unique } from "../../../lib/hash";
import { Runner } from "../../../types/global";
import { Category } from "../../category/model/category.model";
import { SubCategory } from "../model/subCategory.model";
import {
  createSubCategorySchema,
  subCategoryIDSchemaType,
  subCategorySchemaType,
} from "../schema/subCategory.schema";

export const subCategoryRepository = {
  create: async ({
    runner,
    data,
  }: Runner & { data: subCategorySchemaType }) => {
    const subCategoryRepo = runner.manager.getRepository(SubCategory);
    const categoryRepo = runner.manager.getRepository(Category);

    try {
      const category = await categoryRepo.findOne({
        where: { id: data.categoryId },
      });
      if (!category) {
        throw new Error("Category not found");
      }
      const response = await subCategoryRepo.save({
        id: Unique(),
        subCategoryName: data.subCategoryName,
        subCategoryDescription: data.subCategoryDescription,
        category,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  findByName: async ({ runner, name }: Runner & { name: string }) => {
    const repo = runner.manager.getRepository(SubCategory);
    try {
      const response = await repo.findOne({
        where: {
          subCategoryName: name,
        },
      });
      return response ? true : false;
    } catch (error) {
      throw error;
    }
  },

  findById: async ({ runner, id }: Runner & { id: string }) => {
    const repo = runner.manager.getRepository(SubCategory);
    try {
      const response = await repo.findOne({
        where: {
          id: id,
        },
        relations: {
          category: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  findAll: async ({ runner }: Runner) => {
    const repo = runner.manager.getRepository(SubCategory);
    try {
      const response = await repo.find({
        relations: {
          category: true,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async ({
    runner,
    id,
    data,
  }: Runner & { id: string; data: subCategorySchemaType }) => {
    const subCategoryRepo = runner.manager.getRepository(SubCategory);
    const categoryRepo = runner.manager.getRepository(Category);
    try {
      const category = await categoryRepo.findOne({
        where: { id: data.categoryId },
      });
      if (!category) {
        throw new Error("Category not found");
      }
      //  const updatedData = await subCategoryRepo.update(id,data);
      const updateData = await subCategoryRepo.update(id, {
        subCategoryName: data.subCategoryName,
        subCategoryDescription: data.subCategoryDescription,
        category,
      });

      const response = await subCategoryRepo.findOne({
        where: { id },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  remove: async ({ id, runner }: Runner & Pick<SubCategory, "id">) => {
    const repo = runner.manager.getRepository(SubCategory);
    try {
      const response = await repo.delete(id);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
