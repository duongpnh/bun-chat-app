import { Cookie, InternalServerError, NotFoundError } from "elysia";
import { SignInDto } from "./dto/sign-in.dto";
import { UserModel } from "@users/user.schema";
import { encode } from "@middleware/jwt";
import { SignInResponseDto } from "./dto/sign-in-response.dto";
import { UserDto } from "@users/dto/user.dto";

export class AuthService {
  async signIn(payload: SignInDto, cookie: Cookie): Promise<SignInResponseDto> {
    try {
      const { username, password } = payload;

      // TODO: enhancing password
      const user = await UserModel.findOne({
        username,
        password,
      });

      if (!user) {
        throw new NotFoundError(JSON.stringify('Forbidden resource'))
      }

      // set cookie
      (cookie.name as any)?.set({
        domain: 'millennium.sh',
        httpOnly: true,
        value: {
          id: user.id,
        },
      })

      return {
        id: user.id,
        username: user.username as string,
        token: encode(user.id),
      };
    } catch (e) {
      throw new InternalServerError(JSON.stringify(e));
    }
  }
}