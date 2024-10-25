import {
  subCategoryIDSchemaType,
  subCategorySchemaType,
} from "../schema/subCategory.schema";
import { Request, Response, NextFunction } from "express";
import { subCategoryService } from "../service/subCategory.service";
import { formatMessage } from "../../../lib/messageFormater";
import { format } from "path";
import { Category } from "../../category/model/category.model";
import { categoryService } from "../../category/service/category.service";
import Exception from "../../../Helpers/ExceptionHandler";

export const SubCategoryController = {
  createSubCategory: async (
    req: Request<{}, {}, subCategorySchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const subCategoryData = req.body;

      const response = await subCategoryService.createSubCategory(
        subCategoryData
      );
      res
        .status(200)
        .json(
          formatMessage(true, response, "Subcategroy data saved successfully")
        );
    } catch (error) {
      next(error);
    }
  },
  getById: async (
    req: Request<subCategoryIDSchemaType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const subCategoryId = req.params.id;
      const response = await subCategoryService.findById(subCategoryId);
      res
        .status(200)
        .json(
          formatMessage(true, response, "Subcategroy data fetched successfully")
        );
    } catch (error) {
      next(error);
    }
  },
  findAll: async (
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await subCategoryService.findAll();
      res
        .status(200)
        .json(
          formatMessage(
            true,
            response,
            "Successfully fetched all subcategrories"
          )
        );
    } catch (error) {
      next(error);
    }
  },
  updateSubCategory: async (
    req: Request<subCategoryIDSchemaType, {}, subCategorySchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { subCategoryName, subCategoryDescription, categoryId } = req.body;

      const category = await categoryService.getById({ id: categoryId });
      if (!category) throw new Exception("Category not found", 404);

      const response = await subCategoryService.update({
        id,
        subCategoryName,
        subCategoryDescription,
        category,
      });
      res
        .status(200)

        .json(
          formatMessage(true, response, "Subcategory updated successfully")
        );
    } catch (error) {
     next(error);
    }
  },

  deleteSubCategory: async (
    req: Request<subCategoryIDSchemaType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const response = await subCategoryService.removeSubCategory(id);
      res
        .status(201)
        .json(formatMessage(true, "Subcategory deleted successfully"));
    } catch (error) {
      next(error);
    }
  },
};
