import { t } from "elysia";

export class SignUpDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const signUpValidation = {
  body: t.Object({
    email: t.String(),
    firstName: t.String(),
    lastName: t.String(),
    password: t.String(),
  })
};
