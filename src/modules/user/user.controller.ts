import httpStatus from "http-status";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserModel } from "./user.schema";
import { UserService } from "./user.service";

export class UserController {
  private _userService: UserService;
  
  constructor() {
    this._userService = new UserService();
  }

  getUser() {
    return UserModel.find();
  }

  async createUser(payload: CreateUserDto): Promise<string | undefined> {
    await this._userService.createUser(payload);

    return httpStatus[httpStatus.CREATED];
  }
}