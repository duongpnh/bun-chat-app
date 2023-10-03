import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia"

const messageRoute = new Elysia()

const topic = 'chat';
messageRoute
.use(cors())
.use(
  jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET
  })
)
.ws('/chat', {
  body: t.Object({
    message: t.String(),
  }),
  async open(ws) {
    const { query, jwt, store, set } = ws.data;
    const token = query.access_token;
    const payload = await jwt.verify(token);
    const { username } = payload as { username: string };
    // subscribe channel to receive broadcast message
    store['username'] = username;
    ws.subscribe(topic)
    
    // send broadcast message
    ws.publish(topic, JSON.stringify({ username, message: `has joined the channel` }));
  },
  // handler called when a message is received
  message(ws, message) {
    console.log("🚀 ~ file: message.route.ts:34 ~ message ~ message:", message)
    const { store } = ws.data;
    const { username } = store as { username: string };
    const messagePublished = JSON.stringify({ username, message: message.message, sentAt: Date.now() });
    console.log("🚀 ~ file: message.route.ts:38 ~ message ~ messagePublished:", messagePublished)
    // this is a group chat
    // so the server re-broadcasts incoming message to everyone
    ws.publish(topic, messagePublished);
  },
  close(ws) {
    const { store } = ws.data;
    const { username } = store as { username: string };
    const msg = `${username} has left the chat`;
    ws.unsubscribe(topic);
    ws.publish(topic, msg);
  },
}).listen('3003');

export { messageRoute };
