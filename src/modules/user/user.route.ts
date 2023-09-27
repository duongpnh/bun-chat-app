import Elysia from "elysia"
import { bearer } from '@elysiajs/bearer'

import { UserController } from "./user.controller"
import { createUserValidation } from "./dto/create-user.dto";
import { authMiddleware } from "@middleware/auth.middleware";

const userRoute = new Elysia({ prefix: '/users' })
const controller = new UserController();

userRoute.get('/', controller.getUser);
userRoute.post('/', ({ body }) => controller.createUser(body), createUserValidation);

export { userRoute };
