import Elysia from "elysia"
import { authRoute } from "@auth/auth.route";
import { userRoute } from "@users/user.route"
import { route as channelRoute } from "@channel/channel.route"
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";
import swagger from "@elysiajs/swagger";
import { isAuthenticated } from "@middleware/auth.middleware";
import cors from "@elysiajs/cors";

export const routes = (route: Elysia) => {
  // route.get('/', ({ cookie }) => {


  //     // set cookie
  //     (cookie.name as any)?.set({
  //       domain: 'hello.abc',
  //       httpOnly: true,
  //       value: {
  //         id: '#123456',
  //       },
  //     })

  //     return 'OK';
  // })
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
  )

  // web socket
  // route.ws('/ws', {
  //   open(ws) {
  //       console.log("🚀 ~ file: routes.ts:29 ~ open ~ ws:", ws)
  //       const msg = `Anyone has entered the chat`;
  //       ws.subscribe("the-group-chat");
  //       ws.publish("the-group-chat", msg);
  //   },
  //   message(ws, message) {
  //     console.log("🚀 ~ file: routes.ts:19 ~ message ~ ws:", ws)
  //     console.log("🚀 ~ file: index.ts:15 ~ message ~ message:", message)
  //     ws.publish("the-group-chat", message)
  //   },
  //   close(ws) {
  //     const msg = `Anyone has left the chat`;
  //     ws.unsubscribe("the-group-chat");
  //     ws.publish("the-group-chat", msg);
  //   },
  // });
  const topic = 'chat';
  Bun.serve({
    port: 3003,
    fetch(req, server) {
      const url = new URL(req.url);
      if (url.pathname === "/chat") {
        const success = server.upgrade(req, { data: { username: `user_${Math.random().toString(16).slice(12)}` } });
        return success
          ? undefined
          : new Response("WebSocket upgrade error", { status: 400 });
      }
    },
    websocket: {
      open(ws) {
        const { username } = ws.data as { username: string };
        // subscribe channel to receive broadcast message
        ws.subscribe(topic)
        
        // send broadcast message
        ws.publish(topic, JSON.stringify({ username, message: `has joined the channel` }));
      },
      // handler called when a message is received
      message(ws, message) {
        const { username } = ws.data as { username: string };
        // this is a group chat
        // so the server re-broadcasts incoming message to everyone
        ws.publish(topic, JSON.stringify({ username, message }));
      },
      close(ws) {
        const { username } = ws.data as { username: string };
        const msg = `${username} has left the chat`;
        ws.unsubscribe(topic);
        ws.publish(topic, msg);
      },
    },
  });


  return route;
}