import Elysia from "elysia"
import { authRoute } from "@auth/auth.route";
import { userRoute } from "@users/user.route"
import { messageRoute } from "@message/message.route"
import { route as channelRoute } from "@channel/channel.route"
import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import { isAuthenticated } from "@middleware/auth.middleware";
import cors from "@elysiajs/cors";
import cookie from '@elysiajs/cookie';

export const routes = (route: Elysia) => {
  route.use(swagger({
    documentation: {
      info: {
        title: 'Chat App Documentation',
        version: '1.0.0'
      },
    }
  })).group("/api", (app) => 
    app
      .use(cors())
      .use(
        jwt({
          name: 'jwt',
          secret: Bun.env.JWT_SECRET
        })
      )
      .use(cookie())
      .use(isAuthenticated)
      .group("/users", app => app).use(userRoute)
      .group("/auth", app => app).use(authRoute)
      .group("/channels", app => app).use(channelRoute)
      .use(messageRoute)
  )


  return route;
}