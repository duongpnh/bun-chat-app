import { Context, InternalServerError, NotFoundError } from "elysia";
import { SignInDto } from "./dto/sign-in.dto";
import { UserModel } from "@users/user.schema";
import { SignInResponseDto } from "./dto/sign-in-response.dto";
import { UserDto } from "@users/dto/user.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { comparePassword, hashPassword } from "src/utils/bcrypt";
import mongoose from "mongoose";

export class AuthService {
  async signIn(payload: SignInDto, set: Context['set'], jwt: any, setCookie: any): Promise<SignInResponseDto> {
    try {
      const { username, password } = payload;

      // TODO: enhancing password
      const user: UserDto | null = await UserModel.findOne({
        username,
      });

      if (!user) {
        set.status = 400;
        throw 'Invalid credentials';
      }

      const match = await comparePassword(password, user.salt, user.hash);

      if (!match) {
        set.status = 400;

        throw 'Forbidden resource';
      }

      const accessToken = await jwt.sign({
        username: user.username,
      });

      const refreshToken = await jwt.sign({
        username: user.username,
      });

      // set cookie
      setCookie('access_token', accessToken, {
        maxAge: 15 * 60, // 15 minutes
        path: "/",
      });
      setCookie("refresh_token", refreshToken, {
        maxAge: 86400 * 7, // 7 days
        path: "/",
      });

      set.status = 200;

      return {
        username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        success: true,
        message: "Account login successfully",
        token: accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new InternalServerError(JSON.stringify(e));
    }
  }
  
  async signUp(payload: SignUpDto, set: Context['set']): Promise<string> {
    try {
      const { email, firstName, lastName, password } = payload;

      // TODO: enhancing password
      const userExisted = await UserModel.findOne({
        email,
      });

      if (userExisted) {
        throw 'Email address already in use';
      }

      const { hash, salt } = await hashPassword(password);
      const id = new mongoose.mongo.ObjectId();
      const newUser = {
        _id: id,
        username: email.substring(0, email.lastIndexOf('@')),
        firstName,
        lastName,
        email,
        hash,
        salt,
      };

      await UserModel.create(newUser);

      set.status = 201;

      return '201';
    } catch (e) {
      throw new InternalServerError(JSON.stringify(e));
    }
  }
}