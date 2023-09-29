import Elysia from "elysia";
import { UserModel } from "@users/user.schema";

export const isAuthenticated = (app: Elysia) => app.derive(async ({ cookie, jwt, set }) => {
  if (!cookie.access_token) {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const { id } = await jwt.verify(cookie!.access_token);

  if (!id) {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const user = await UserModel.findById(id);

  if (!user) {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  return {
    user,
  };
});