import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Cookie } from "elysia";

export class AuthController {
  private _service: AuthService;
  
  constructor() {
    this._service = new AuthService();
  }

  signIn(payload: SignInDto, cookie: Cookie) {
    return this._service.signIn(payload, cookie);
  }
}