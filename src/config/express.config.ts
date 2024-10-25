import express, { Express } from "express";

import helmet from "helmet";
import morgan from "morgan";
import { environment } from "./env.config";
import path from "path";
import { routers } from "../shared";
import errorHandler from "../Helpers/errorHandler";

export const initializeExpressServer = (app: Express) => {
  app.use(
    "/static/",
    express.static(
      path.join(process.env.ASSETS_BASE_PATH as string, "/public/")
    )
  );
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("dev"));
  app.use(helmet.xssFilter());
  app.disable("x-powered-by");
  routers(app);
  app.use(errorHandler());
  const PORT = environment.SERVER_PORT;
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  });
};
