import { ZodError } from "zod";
import Logger from "../lib/winston";
import unsync from "./unsync";
import { NextFunction, Request, Response } from "express";

const errorHandler = () => {
  return async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      unsync(req.file.path);
    }
    if (req.files) {
      const files = req.files;

      if (Array.isArray(files)) {
        files.forEach(async (item, index) => {
          unsync(item.path);
        });
      } else {
        for (const key in files) {
          if (Object.prototype.hasOwnProperty.call(files, key)) {
            const element = files[key];
            if (element.length > 0) {
              element.forEach(async (item, index) => {
                unsync(item.path);
              });
            }
          }
        }
      }
    }

    if (err.level === "DB") {
      Logger.error(err.message);
      res.status(500).send({ error: "Internal Server Error" });
    } else {
      res.status(400).send({ error: err.message ? err.message : err });
    }
  };
};
export default errorHandler;
