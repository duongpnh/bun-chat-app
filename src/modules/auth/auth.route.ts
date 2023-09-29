import Elysia from "elysia"

import { signInValidation } from "./dto/sign-in.dto";
import { AuthController } from "./auth.controller";
import { signUpValidation } from "./dto/sign-up.dto";

const authRoute = new Elysia({ prefix: '/auth' })
const controller = new AuthController();

authRoute.post('/sign-up', ({ body, set }) => controller.signUp(body, set), signUpValidation);
authRoute.post('/sign-in', ({ body, set, jwt, setCookie }) => controller.signIn(body, set, jwt, setCookie), signInValidation);

export { authRoute };
