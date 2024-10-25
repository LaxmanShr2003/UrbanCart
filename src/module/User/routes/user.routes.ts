import { Router } from "express";
import { validateToken } from "../../../auth/validateToken";
import { userIdScheama, userSchema } from "../schema/user.schema";
import ZOD from "../../../middleware/zod.validation";
import MulterHelper from "../../../middleware/multer";
import { userProfiles } from "../../../utils/user.profiles";
import { userController } from "../controller/user.controller";

export const userRoutes = (router: Router) => {
  router.post(
    "/user/customer",
    // validateToken({ checkAdmin: true }),
    MulterHelper.getstorage(process.env.ACCESS_PATH, {
      isFile: false,
      moduleName: "/uploads",
    }).fields([...userProfiles]),
    ZOD.requestParser({
      schema: userSchema,
      type: "Body",
      isFile: true,
    }),
    userController.createUser
  );
  router.post(
    "/user/employee",
    validateToken({ checkAdmin: true }),
    MulterHelper.getstorage(process.env.ACCESS_PATH, {
      isFile: false,
      moduleName: "/uploads",
    }).fields([...userProfiles]),
    ZOD.requestParser({
      schema: userSchema,
      type: "Body",
      isFile: false,
    }),
    userController.createEmployee
  );
  router.post(
    "/user/admin",
    validateToken({ checkAdmin: true }),
    MulterHelper.getstorage(process.env.ACCESS_PATH, {
      isFile: false,
      moduleName: "/uploads",
    }).fields([...userProfiles]),
    ZOD.requestParser({
      schema: userSchema,
      type: "Body",
      isFile: false,
    }),
    userController.createAdmin
  );
  router.get(
    "/user/:id",
    validateToken({ checkAdmin: true }),
    ZOD.requestParser({
      schema: userIdScheama,
      type: "Params",
      isFile: false,
    }),
    userController.getById
  );
  router.get(
    "/users",
    validateToken({ checkAdmin: true }),
    userController.findAllUsers
  );
  router.patch(
    "/user/update/:id",
    validateToken({ checkAdmin: true }),
    MulterHelper.getstorage(process.env.ACCESS_PATH, {
      isFile: false,
      moduleName: "user",
    }).fields([...userProfiles]),
    ZOD.requestParser(
      {
        schema: userSchema,
        type: "Body",
        isFile: false,
      },
      {
        schema: userIdScheama,
        type: "Params",
      }
    ),
    userController.updateUser
  );
  router.delete(
    "/user/delete/:id",
    // validateToken({ checkAdmin: true }),
    ZOD.requestParser({
      schema: userIdScheama,
      type: "Params",
    }),
    userController.removeUser
  );

  router.post("/login", userController.login);
};
