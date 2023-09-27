import httpStatus from "http-status";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserModel } from "./user.schema";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { Cookie } from "elysia";

export class UserController {
  private _service: UserService;
  
  constructor() {
    this._service = new UserService();
  }

  getUser() {
    return UserModel.find();
  }

  async createUser(payload: CreateUserDto): Promise<string | undefined> {
    await this._service.createUser(payload);

    return httpStatus[httpStatus.CREATED];
  }

  async getUserById(id: string): Promise<UserDto | null> {
    return this._service.getUserById(id);
  }
}