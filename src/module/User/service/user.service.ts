import { environment } from "../../../config/env.config";
import { AppDataSource } from "../../../config/orm.config";
import {
  AccessToken,
  AccessTokenpayload,
  UserRole,
} from "../../../types/global";
import Exception from "../../../Helpers/ExceptionHandler";
import ORMHelper from "../../../Helpers/ORMHelper";
import { comparePassword } from "../../../lib/bcrypt";
import JWT from "../../../lib/token";
import { userRepository } from "../repository/user.repository";
import { UserCreateSchemaType, UserIdSchemaType } from "../schema/user.schema";
import { unsyncFromPublic } from "../../../Helpers/unsync";

export const userService = {
  createUser: async (data) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const email = data.email;
      const isEmailExists = await userRepository.findByEmail({ email, runner });
      if (isEmailExists) throw new Exception("Email already exists", 400);

      const response = await userRepository.create({ data, runner });
      if (!response) throw new Exception("Unable to save the user data", 400);

      return response;
    } catch (error) {
      throw error;
    } finally {
      await runner.release();
    }
  },
  updateUser: async (id, data) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const isIdExists = await userRepository.getById({ id, runner });
      if (!isIdExists) throw new Exception("User is not exists!", 400);
      let image = isIdExists.image;
      const response = await userRepository.update({ id, data, runner });
      if (!response)
        throw new Exception("Unable to update the user details", 400);

      unsyncFromPublic(`${image}`);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await runner.release();
    }
  },
  findUsers: async () => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const response = await userRepository.find({ runner });
      if (!response) throw new Exception("No any user found", 400);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await runner.release();
    }
  },
  findUserById: async (id: string) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const isIdExists = await userRepository.getById({ id, runner });
      if (!isIdExists) throw new Exception("User doesnot exists!", 400);
      return isIdExists;
    } catch (error) {
      throw error;
    } finally {
      await runner.release;
    }
  },
  removeUser: async (id: string) => {
    const runner = await ORMHelper.createQueryRunner();
    try {
      const isIdExists = await userRepository.getById({ id, runner });
      if (!isIdExists) throw new Exception("User doesnot exists!", 400);
      let image = isIdExists.image;
      const response = await userRepository.remove({ id, runner });
      if (response.affected === 0) {
        throw new Exception("User not found or no changes were made", 400);
      }
      unsyncFromPublic(`${image}`);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await runner.release;
    }
  },
  userLogin: async (email, password) => {
    const tokentype = {
      ACCESS: environment.SECRET_KEY,
    };
    const runner = await ORMHelper.createQueryRunner();
    try {
      const isEmailExists = await userRepository.findByEmail({ email, runner });
      if (!isEmailExists) throw new Exception("Email doesnot exists", 400);

      const isMatched = comparePassword(password, isEmailExists.password);
      if (!isMatched) throw new Exception("Password doesnot matched", 403);

      const payload = {
        id: isEmailExists.id,
        email: isEmailExists.email,
        role: isEmailExists.role,
      } as AccessTokenpayload;
      const token = JWT.sign({
        payload: payload,
        secretKey: tokentype.ACCESS,
      });
      return token;
    } catch (error) {
      throw error;
    }
  },
};
