import { t } from "elysia";

export class SignInDto {
  username: string;
  password: string;
}

export const signInValidation = {
  body: t.Object({
    username: t.String(),
    password: t.String(),
  })
};
