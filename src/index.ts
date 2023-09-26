import { Elysia, InternalServerError } from "elysia";
import mongoose from "mongoose";

import './bun.env';
import { userRoute } from '@users/user.route';
import { wsRoute } from "@ws/message.route";

const app = new Elysia();

app.get("/", () => "Hello World");

app.group("/users", app => app).get('/', () => 'Using Users').use(userRoute);
app.ws('/ws', {
  open(ws) {
      const msg = `Anyone has entered the chat`;
      ws.subscribe("the-group-chat");
      ws.publish("the-group-chat", msg);
  },
  message(ws, message) {
    console.log("🚀 ~ file: index.ts:15 ~ message ~ message:", message)
    ws.publish("the-group-chat", message)
  },
  close(ws) {
    const msg = `Anyone has left the chat`;
    ws.unsubscribe("the-group-chat");
    ws.publish("the-group-chat", msg);
  },
});

(async () => {
  try {
    await mongoose.connect(Bun.env.MONGO_URL);

    app.listen(3000);

    console.log('App listen on PORT', Bun.env.PORT)
  } catch (e) {
    console.log("🚀 ~ file: index.ts:18 ~ e:", e)
    throw new InternalServerError(JSON.stringify(e));
  }
})()
