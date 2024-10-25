import {
  UserCreateSchemaType,
  UserIdSchemaType,
  UserLoginSchemaType,
} from "../schema/user.schema";

import { Response, Request, NextFunction } from "express";
import { userService } from "../service/user.service";
import { formatMessage } from "../../../lib/messageFormater";
import { UserRole } from "../../../types/global";
import Exception from "../../../Helpers/ExceptionHandler";

export const userController = {
  createUser: async (
    req: Request<{}, {}, UserCreateSchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.body;
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      if (!files) throw new Error("Profile image is required");
      const profiles = files?.profile?.[0];
      const user = {
        ...userData,
        image: profiles.filename,
       
      };
      const response = await userService.createUser(user);
      res
        .status(200)
        .json(formatMessage(true, response, "User created successfully"));
    } catch (error) {
      next(error);
    }
  },

  login: async (
    req: Request<{}, {}, UserLoginSchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const response = await userService.userLogin(email, password);
      if (!response) throw new Error("login failed");
      res.status(200).json(formatMessage(true, response, "Login successful"));
    } catch (error) {
      next(error);
    }
  },

  createAdmin: async (
    req: Request<{}, {}, UserCreateSchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.body;
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const profiles = files?.profile?.[0];
      if (!files) throw new Error("Profile image is required");

      const user = {
        ...userData,
        image: profiles.filename,
        role: UserRole.ADMIN,
      };

      const response = await userService.createUser(user);
      res
        .status(200)
        .json(formatMessage(true, response, "Admin created successfully"));
    } catch (error) {
      next(error);
    }
  },

  createEmployee: async (
    req: Request<{}, {}, UserCreateSchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const profiles = files?.profile[0];

      if (!files) throw new Error("Profile image is required");

      const user = {
        ...userData,
        image: profiles.filename,
        role: UserRole.EMPLOYEE,
      };

      const response = await userService.createUser(user);
      res
        .status(200)
        .json(formatMessage(true, response, "Employee created successfully"));
    } catch (error) {
      next(error);
    }
  },

  getById: async (
    req: Request<UserIdSchemaType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const response = await userService.findUserById(userId);
      if (!response) throw new Exception("User not found", 400);
      res
        .status(200)
        .json(formatMessage(true, response, "Successfully fetched user"));
    } catch (error) {
      next(error);
    }
  },

  findAllUsers: async (
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await userService.findUsers();
      if (!response) throw new Exception("No users found", 400);
      res
        .status(200)
        .json(formatMessage(true, response, "Successfully fetched all users"));
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (
    req: Request<UserIdSchemaType, {}, UserCreateSchemaType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);
      const userId = req.params.id;
      const userData = req.body;
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const profiles = files?.profile[0];
      const user = {
        ...userData,
        image: profiles.filename,
      };

      const response = await userService.updateUser(userId, user);
      if (!response) throw new Exception("Unable to update user data", 400);
      res
        .status(200)
        .json(formatMessage(true, response, "Successfully updated user data"));
    } catch (error) {
      next(error);
    }
  },

  removeUser: async (
    req: Request<UserIdSchemaType, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const response = await userService.removeUser(userId);
      if (!response) throw new Error("Unable to delete user data");
      res
        .status(200)
        .json(formatMessage(true, "User data deleted successfully"));
    } catch (error) {
      next(error);
    }
  },
};
