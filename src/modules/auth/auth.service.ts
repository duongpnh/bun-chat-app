import { Context, Cookie, InternalServerError, NotFoundError } from "elysia";
import { SignInDto } from "./dto/sign-in.dto";
import { UserModel } from "@users/user.schema";
import { SignInResponseDto } from "./dto/sign-in-response.dto";
import { UserDto } from "@users/dto/user.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { comparePassword, hashPassword, md5hash } from "src/utils/bcrypt";
import mongoose from "mongoose";
import httpStatus from "http-status";

export class AuthService {
  async signIn(payload: SignInDto, set: Context['set'], jwt: any, setCookie: any): Promise<SignInResponseDto> {
    try {
      const { username, password } = payload;

      // TODO: enhancing password
      const user = await UserModel.findOne({
        username,
      });
      console.log("🚀 ~ file: auth.service.ts:21 ~ AuthService ~ signIn ~ user:", user)

      if (!user) {
        set.status = 400;
        throw 'Invalid credentials';
      }

      const match = await comparePassword(password, user.salt as string, user.hash as string);

      if (!match) {
        set.status = 400;

        throw 'Forbidden resource';
      }

      const accessToken = await jwt.sign({
        id: user.id,
      });

      const refreshToken = await jwt.sign({
        id: user.id,
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

      return {
        success: true,
        data: null,
        message: "Account login successfully",
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