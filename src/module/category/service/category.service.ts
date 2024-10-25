import Exception from "../../../Helpers/ExceptionHandler";
import ORMHelper from "../../../Helpers/ORMHelper";
import { categoryRepository } from "../repository/category.repository";
import { CategorySchemaType } from "../schema/category.schema";

export const categoryService = {
  create: async (data: CategorySchemaType) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const categoryName = data.categoryName;
      const isNameExists = await categoryRepository.findByName({
        runner,
        categoryName,
      });
      if (isNameExists) throw new Error("Category name already exists");
      const response = await categoryRepository.create({ runner, data });
      if (!response) throw new Exception("Unable to save categrory data", 400);

      return response;
    } catch (error) {
      throw error;
    } finally {
      runner.release();
    }
  },

  getById: async (id) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
    
      const response = await categoryRepository.findById({ runner, id });
      if (!response) throw new Exception("Category not found", 404);
    
      return response;
    } catch (error) {
      throw error;
    } finally {
      runner.release();
    }
  },

  findAll: async () => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const response = await categoryRepository.find({ runner });
      if (!response) throw new Exception("No category found", 404);

      return response;
    } catch (error) {
      throw error;
    } finally {
      runner.release();
    }
  },
  removeCategory: async (id) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const isIdExists = await categoryRepository.findById({ runner, id });
      if (!isIdExists) throw new Error("No category found");
      const response = await categoryRepository.remove({ runner, id });
      if (response.affected === 0)
        throw new Error("Unable to delete the category data");
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateCategory: async (id, data: CategorySchemaType) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const categoryName = data.categoryName;
      const isIdExists = await categoryRepository.findById({ runner, id });

      if (!isIdExists) throw new Exception("Category doesnot exists", 400);

      if (categoryName == isIdExists.categoryName)
        throw new Error("Category name already exists or cannot be dublicate");

      const response = await categoryRepository.update({ runner, data, id });
      if (!response)
        throw new Exception("Unable to update the category data", 400);
      return response;
    } catch (error) {
      throw error;
    } finally {
      runner.release();
    }
  },
};
