import Exception from "../../../Helpers/ExceptionHandler";
import ORMHelper from "../../../Helpers/ORMHelper";
import { categoryRepository } from "../../category/repository/category.repository";
import { SubCategory } from "../model/subCategory.model";
import { subCategoryRepository } from "../repository/subCategory.repository";
import {
  subCategoryIdSchema,
  subCategorySchemaType,
} from "../schema/subCategory.schema";

export const subCategoryService = {
  createSubCategory: async (data) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const subCategoryName = data.subCategoryName;
      const categoryId = data.categoryId;
      const isCategoryExists = await categoryRepository.findById({
        id: categoryId,
        runner,
      });
      if (!isCategoryExists)
        throw new Exception("Subcategory doesnot exists", 404);

      const isNameExists = await subCategoryRepository.findByName({
        runner,
        name: subCategoryName,
      });

      if (isNameExists) throw new Error("Subcategory name already exists.");

      const response = await subCategoryRepository.create({
        runner,
        data,
      });
      if (!response) throw new Exception("Unable to save subcategory daa", 400);
      return response;
    } catch (error) {
      throw error;
    } finally {
      runner.release();
    }
  },

  findById: async (id: string) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      console.log(id)
      const response = await subCategoryRepository.findById({ runner, id });
      if (!response) throw new Exception("Unable to find subCategory", 404);
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
      const response = await subCategoryRepository.findAll({ runner });
      if (!response) throw new Exception("SubCategory not found", 404);
      return response;
    } catch (error) {
      throw error;
    } finally {
      runner.release();
    }
  },
  update: async ({
    id,
    ...data
  }: Pick<
    SubCategory,
    "subCategoryName" | "subCategoryDescription" | "category"
  > &
    Pick<SubCategory, "id">) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const isSubCategoryExists = await subCategoryRepository.findById({
        runner,
        id,
      });
      if (!isSubCategoryExists)
        throw new Exception("Subcategory not found", 404);

      const isNameExists = await subCategoryRepository.findByName({
        runner,
        name: data.subCategoryName,
      });

      if (isNameExists) throw new Error("Subcategory name already exists.");

      const response = await subCategoryRepository.update({
        runner,
        id,
        data,
      });
      if (!response) throw new Exception("Unable to save subcategory daa", 400);
    
      return response;
    } catch (error) {
      throw error;
    } finally {
      runner.release();
    }
  },
  removeSubCategory: async(id)=>{
    const runner = await ORMHelper.createQueryRunner();
    try{
      const response = await subCategoryRepository.remove({id,runner});
      if(response.affected===0) throw new Error("Unable to delete subcategory");
      return response;

    }catch(error){
      throw error;
    }
  }
};
