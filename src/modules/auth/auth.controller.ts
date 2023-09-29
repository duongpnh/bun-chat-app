import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Context, Cookie } from "elysia";
import { SignUpDto } from "./dto/sign-up.dto";

export class AuthController {
  private _service: AuthService;
  
  constructor() {
    this._service = new AuthService();
  }

  signIn(payload: SignInDto, set: any, jwt: any, setCookie: any) {
    return this._service.signIn(payload, set, jwt, setCookie);
  }

  signUp(payload: SignUpDto, set: Context['set']) {
    return this._service.signUp(payload, set);
  }
}