import { Request, Response, NextFunction } from "express";
import { productCreateType, productIdType } from "../schema/product.schema";
import { productService } from "../service/product.service";
import { formatMessage } from "../../../lib/messageFormater";
import Exception from "../../../Helpers/ExceptionHandler";
import { productImages } from "../../../utils/user.profiles";
import { unsyncFromPublic } from "../../../Helpers/unsync";

export const productController = {
  createProduct: async (
    req: Request<{}, {}, productCreateType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;

      const images = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const productImageUrl = images?.productImage[0];
   

      if (!productImageUrl)
        throw new Exception("Product image is required", 404);

      const productData = {
        productImage: productImageUrl.filename,
        ...data,
      };
      console.log(productData)
      const response = await productService.createProduct(productData);
      res
        .status(201)
        .json(formatMessage(true, response, "Product data saved successfully"));
    } catch (error) {
      next(error);
    }
  },

  findAllProducts: async (
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await productService.findAll();
      if (!response) throw new Exception("Product not found!", 404);
      res
        .status(201)
        .json(
          formatMessage(true, response, "All products fetched successfully")
        );
    } catch (error) {
      next(error);
    }
  },
  removeProduct: async (
    req: Request<productIdType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const response = await productService.removeProduct(id);
      res
        .status(201)
        .json(formatMessage(true, "Product data deleted successfully"));
    } catch (error) {
      next(error);
    }
  },

  findProduct: async (
    req: Request<productIdType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const response = await productService.findById(id);
      if (!response) throw new Exception("Product not found!", 404);
      res
        .status(201)
        .json(
          formatMessage(true, response, "Successfully fetched product data")
        );
    } catch (error) {}
  },

  updateProduct: async (
    req: Request<productIdType, {}, productCreateType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = req.params.id;
      const productData = req.body;

      if (req.files) {
        const { productImage } = await productService.findById(productId);
        if (!productImage)
          throw new Exception("Unable to find the old image", 404);
        unsyncFromPublic(productImage);
      }

      const imagedata = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const newImageUrl = imagedata?.productImage[0].filename;
      const productUpdatedData = {
        productImage: newImageUrl,
        ...productData,
      };
      const response = await productService.updateProduct(
        productId,
        productUpdatedData
      );
      if (!response)
        throw new Exception("Unable to update product details", 400);
      res
        .status(201)
        .json(
          formatMessage(true, response, "Product details updated successfully")
        );
    } catch (error) {
      next(error);
    }
  },
};
