import { t } from "elysia";

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const createUserValidation = {
  body: t.Object({
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
    password: t.String(),
  })
};
