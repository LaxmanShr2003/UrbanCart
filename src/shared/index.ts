import { Express, Router } from "express";
import { userRoutes } from "../module/User/routes/user.routes";
import { categoryRouters } from "../module/category/routes/category.routes";
import { subCategoryRoutes } from "../module/subCategory/routes/subCategory.routes";
import { productRoute } from "../module/product/router/product.route";
import { cartRoute } from "../module/cart/routes/cart.route";
import { orderRoutes } from "../module/order/router/order.routes";


export const routers = (app: Express) => {
  const router = Router();
  userRoutes(router);
  categoryRouters(router);
  subCategoryRoutes(router);
  productRoute(router);
  cartRoute(router);
  orderRoutes(router);
  app.use("/api", router);
};
