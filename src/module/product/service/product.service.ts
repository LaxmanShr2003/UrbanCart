import Exception from "../../../Helpers/ExceptionHandler";
import ORMHelper from "../../../Helpers/ORMHelper";
import { subCategoryRepository } from "../../subCategory/repository/subCategory.repository";
import { ProductRepository } from "../repository/product.repository";

export const productService = {
  createProduct: async (data) => {
    const runner = await ORMHelper.createQueryRunner();

    try {
      const isSubCategoryExists = await subCategoryRepository.findById({
        id: data.subCategoryId,
        runner,
      });
     

      if (!isSubCategoryExists)
        throw new Exception("Subcategory doesnot exists", 404);

      const isNameExists = await ProductRepository.findByName({
        runner,
        productName: data.productName,
      });
      if (isNameExists) throw new Error("Product name already exists");

      const response = await ProductRepository.create({ runner, data });
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
      const response = await ProductRepository.findAll({ runner });
      if (!response) throw new Exception("No product found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  },

  findById: async (id) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const response = await ProductRepository.find({ runner, id });
      if (!response) throw new Exception("No product found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  },
  removeProduct: async (id) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const response = await ProductRepository.remove({ runner, id });
      if (response.affected === 0)
        throw new Exception(
          "No product found or unable to delete product",
          404
        );
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (id, data) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const isSubCategoryExists = await subCategoryRepository.findById({
        id: data.subCategoryId,
        runner,
      });

      if (!isSubCategoryExists)
        throw new Exception("Subcategory doesnot exists", 404);

      const isNameExists = await ProductRepository.findByName({
        runner,
        productName: data.productName,
      });
      if (isNameExists) throw new Error("Product name already exists");

      const response = await ProductRepository.update({ runner, data, id });
      if (!response)
        throw new Exception("Unable to update product details", 400);

      return response;
    } catch (error) {
      throw error;
    }
  },
};
