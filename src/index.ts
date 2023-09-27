import { Elysia, InternalServerError } from "elysia";
import mongoose from "mongoose";

import './bun.env';
import { routes } from "./modules/routes";
import { request } from "http";

const app = new Elysia();

app.trace(async ({ handle, set }) => {
  const { time, end } = await handle

  set.headers['Server-Timing'] = `handle;dur=${(await end) - time}`
})
app.get("/health-check", () => "Server is working");

app.use(routes(app));

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
