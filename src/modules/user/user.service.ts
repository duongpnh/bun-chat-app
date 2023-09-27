import { InternalServerError } from "elysia";
import httpStatus from "http-status";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserModel } from "./user.schema";
import mongoose from "mongoose";
import { UserDto } from "./dto/user.dto";

export class UserService {
  async createUser(user: CreateUserDto): Promise<string | undefined> {
    try {
      const id = new mongoose.mongo.ObjectId();
      const newUser = {
        _id: id,
        username: user.email.substring(0, user.email.lastIndexOf('@')),
        ...user,
      };
      console.log("🚀 ~ file: user.service.ts:11 ~ UserService ~ createUser ~ id:", newUser)

      const res = await UserModel.create(newUser);

      return httpStatus[httpStatus.CREATED];
    } catch (e) {
      console.log("🚀 ~ file: user.service.ts:13 ~ UserService ~ createUser ~ e:", e)
      throw new InternalServerError(JSON.stringify(e));
    }
  }

  async getUserById(id: string): Promise<UserDto | null> {
    try {
      return UserModel.findById(id);
    } catch (e) {
      console.log("🚀 ~ file: user.service.ts:32 ~ UserService ~ getUserById ~ e:", e)
      throw new InternalServerError(JSON.stringify(e));
    }
  }
}