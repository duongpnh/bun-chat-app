import Elysia from "elysia"

import { signInValidation } from "./dto/sign-in.dto";
import { AuthController } from "./auth.controller";

const authRoute = new Elysia({ prefix: '/auth' })
const controller = new AuthController();

authRoute.post('/sign-in', ({ body, cookie }) => controller.signIn(body, cookie), signInValidation);

export { authRoute };
