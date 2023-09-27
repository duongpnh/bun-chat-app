import Elysia from "elysia"
import { authRoute } from "@auth/auth.route";
import { userRoute } from "@users/user.route"
import { route as channelRoute } from "@channel/channel.route"

export const routes = (route: Elysia) => {
  route.get('/', ({ cookie }) => {


      // set cookie
      (cookie.name as any)?.set({
        domain: 'hello.abc',
        httpOnly: true,
        value: {
          id: '#123456',
        },
      })

      return 'OK';
  })

  route.group("/users", app => app).use(userRoute);
  route.group("/auth", app => app).use(authRoute);
  route.group("/channels", app => app).use(channelRoute);

  // web socket
  route.ws('/ws', {
    open(ws) {
        const msg = `Anyone has entered the chat`;
        ws.subscribe("the-group-chat");
        ws.publish("the-group-chat", msg);
    },
    message(ws, message) {
      console.log("🚀 ~ file: routes.ts:19 ~ message ~ ws:", ws)
      console.log("🚀 ~ file: index.ts:15 ~ message ~ message:", message)
      ws.publish("the-group-chat", message)
    },
    close(ws) {
      const msg = `Anyone has left the chat`;
      ws.unsubscribe("the-group-chat");
      ws.publish("the-group-chat", msg);
    },
  });


  return route;
}