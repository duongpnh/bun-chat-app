import Elysia from "elysia"

import { UserController } from "./user.controller"
import { createUserValidation } from "./dto/create-user.dto";

const userRoute = new Elysia({ prefix: '/users' })
const controller = new UserController();

userRoute.get('/', controller.getUser);
userRoute.post('/', ({ body }) => controller.createUser(body), createUserValidation);

export { userRoute };
