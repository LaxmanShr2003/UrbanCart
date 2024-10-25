import { Unique } from "../lib/hash";
import multer from "multer";
import * as path from "path";
import { Request } from "express";

export default class MulterHelper {
  static diskstorage(path: string, moduleName: string) {
    return multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, path);
      },
      filename: (req: Request, file, cb) => {
        const extension = file.originalname.split(".").pop();
        cb(null, `${moduleName}-${Unique()}.${extension}`);
      },
    });
  }

  static getstorage(
    path: string,
    options: {
      limits?: {
        fileSize?: number;
      };
      isFile?: boolean;
      moduleName: string;
    } = {
      limits: { fileSize: 4 * 1024 * 1024 },
      moduleName: "default",
    }
  ) {
    return multer({
      storage: this.diskstorage(path, options.moduleName),
      limits: options.limits,
      fileFilter: this.fileFilter({ isFile: options.isFile }),
    });
  }

  static fileFilter(options: { isFile?: boolean } = { isFile: false }) {
    try {
      return (
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
      ) => {
        const filetypes = options.isFile
          ? /pdf|docx|xlxs|csv/g
          : /png|jpeg|jpg/;

        const extension = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimetype = filetypes.test(file.mimetype);

        if (extension && mimetype) {
          cb(null, true);
        } else {
          cb(
            new Error(
              options.isFile ? "Error: Files only" : "Error: Images only"
            )
          );
        }
      };
    } catch (error) {
      throw error;
    }
  }
}
