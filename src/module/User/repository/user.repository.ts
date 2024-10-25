import { Runner } from "../../../types/global";
import { Unique } from "../../../lib/hash";
import { User } from "../model/user.model";
import { UserCreateSchemaType, UserIdSchemaType } from "../schema/user.schema";
import Exception from "../../../Helpers/ExceptionHandler";

export const userRepository = {
  create: async ({ runner, data }: Runner & { data: UserCreateSchemaType }) => {
    const repo = runner.manager.getRepository(User);
    try {
      const saveData = await repo.create({
        id: Unique(),
        password: data.password,
        ...data,
      });
      await repo.save(saveData);
      return saveData;
    } catch (error) {
      throw error;
    }
  },

  getById: async ({ id, runner }: Runner & { id: string }) => {
    const repo = runner.manager.getRepository(User);
    try {
      const response = await repo.findOne({
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  find: async ({ runner }: Runner) => {
    const repo = runner.manager.getRepository(User);
    try {
      const response = await repo.find();
      return response;
    } catch (error) {
      throw error;
    }
  },
  update: async ({
    id,
    data,
    runner,
  }: Runner & { id: string; data: UserCreateSchemaType }) => {
    const repo = runner.manager.getRepository(User);
    try {
      const updateResult = await repo.update(
        { id },
        {
          ...data,
        }
      );
      const updatedUser = await repo.findOne({ where: { id } });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  remove: async ({ id, runner }: Runner & { id }) => {
    const repo = runner.manager.getRepository(User);
    try {
      const deletedData = await repo.delete({ id });
      return deletedData;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async ({ email, runner }: Runner & { email }) => {
    const repo = runner.manager.getRepository(User);
    try {
      console.log(email);
      const response = await repo.findOne({
        where: {
          email: email,
        },
      });
      return response;
    } catch (error) {
      console.log("Unable to find the user by email", error);
    }
  },
};
