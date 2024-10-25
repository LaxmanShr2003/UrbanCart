import { DataSource } from "typeorm";
import { environment } from "./env.config";
import { User } from "../module/User/model/user.model";
import { Category } from "../module/category/model/category.model";
import { SubCategory } from "../module/subCategory/model/subCategory.model";
import { Product } from "../module/product/model/product.model";
import { Cart } from "../module/cart/model/cart.model";
import { OrderDetail } from "../module/orderDetails/model/orderDetails.model";
import { Payment } from "../module/payment/model/payment.model";
import { Order } from "../module/order/model/order.model";
import path from "path";

export const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: environment.DB_HOST!,
  port: +environment.DB_PORT!,
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  synchronize: true,

  entities: [
    User,
    Category,
    SubCategory,
    Product,
    Cart,
    Order,
    OrderDetail,
    Payment,
  ],
});

export const intializeDatasource = async () => {
  try {
    const datasource = await AppDataSource.initialize();
    await datasource.runMigrations();
    console.log("DB connected");
  } catch (error) {
    console.log("unable to connect datasource", error);
  }
};
