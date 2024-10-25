import {
  CategoryIDSchemaType,
  CategorySchemaType,
} from "../schema/category.schema";

import { Request, Response, NextFunction } from "express";
import { categoryService } from "../service/category.service";
import { formatMessage } from "../../../lib/messageFormater";

export const categoryController = {
  createCategory: async (
    req: Request<{}, {}, CategorySchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryData = req.body;
      const response = await categoryService.create(categoryData);
      res
        .status(200)
        .json(
          formatMessage(true, response, "Category data saved successfully")
        );
    } catch (error) {
      next(error);
    }
  },
  findById: async (
    req: Request<CategoryIDSchemaType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryId = req.params.id;

      const response = await categoryService.getById(categoryId);
      res
        .status(200)
        .json(
          formatMessage(true, response, "Category data fetched successfully")
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
      const response = await categoryService.findAll();
      res
        .status(200)
        .json(
          formatMessage(true, response, "Sucessfully fetched all category data")
        );
    } catch (error) {
      next(error);
    }
  },

  removeCategory: async (
    req: Request<CategoryIDSchemaType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryId = req.params.id;

      const response = await categoryService.removeCategory(categoryId);
      res
        .status(200)
        .json(
          formatMessage(true, response, "Category data deleted successfully")
        );
    } catch (error) {
      next(error);
    }
  },

  updateCategory: async (
    req: Request<CategoryIDSchemaType, {}, CategorySchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryId = req.params.id;
      const categroyData = req.body;

      const response = await categoryService.updateCategory(
        categoryId,
        categroyData
      );
      res
        .status(200)
        .json(
          formatMessage(true, response, "Category data updated successfully")
        );
    } catch (error) {
      next(error);
    }
  },
};
