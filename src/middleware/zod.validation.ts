import { Request, Response, NextFunction } from "express";
import { SimpleConsoleLogger } from "typeorm";
import { ZodTypeAny } from "zod";

export default class ZOD {
  static requestParser =
    (
      ...args: {
        schema: ZodTypeAny;
        type: "Params" | "Body" | "Query";
        isFile?: boolean;
      }[]
    ) =>
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | any> => {
      try {
        let response;
        for (const item of args) {
          if (item.type == "Body") {
            response = await item.schema.safeParseAsync(req.body);

            if (response.success) {
              req.body = response.data;
              continue;
            }
            if (item.isFile) {
              return next({ success: false, data: response.error.issues });
            }
            if (!response.success) {
              return next({
                success: false,
                data: response.error.issues,
              });
            }
          }

          if (item.type == "Params") {
            response = await item.schema.safeParseAsync(req.params);

            if (response.success) {
              req.params = response.data;
             
              continue;
            }
            return res
              .status(400)
              .send({ success: false, data: response.error.issues });
          }
          if (item.type == "Query") {
            response = await item.schema.safeParseAsync(req.query);
            if (response.success) {
              req.query = response.data;
              continue;
            }
            return res
              .status(400)
              .send({ success: false, data: response.error.issues });
          }
        }

        next();
      } catch (error) {
        throw error;
      }
    };
}
