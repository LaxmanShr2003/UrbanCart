import { Request, Response, NextFunction } from "express";
import { environment } from "../config/env.config";
import JWT from "../lib/token";
import { AccessTokenpayload } from "../types/global";

export const tokenType = {
  ACCESS: environment.SECRET_KEY,
};

export const validateToken =
  ({
    checkAdmin = false,
    checkCustomer = false,
    checkEmployee = false,
  }: {
    checkAdmin?: boolean;
    checkCustomer?: boolean;
    checkEmployee?: boolean;
  }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) throw new Error("token missing");
      const decode = JWT.verify<AccessTokenpayload>({
        payload: token,
        secretKey: tokenType.ACCESS,
      });

      if (!decode) throw new Error("Token invalid");

      if (!decode || (!checkAdmin && decode.role !== "ADMIN")) {
        new Error("Unauthorized admin");
      }

      if (!decode || (!checkCustomer && decode.role !== "CUSTOMER")) {
        new Error("Unauthorized customer");
      }
      if (!decode || (!checkEmployee && decode.role !== "EMPLOYEE")) {
        new Error("Unauthorized employee");
      }

      req.accessToken = decode;
      next();
    } catch (error) {
      throw error;
    }
  };
