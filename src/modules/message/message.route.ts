import Elysia from "elysia"

const wsRoute = new Elysia({ prefix: '/ws' })

wsRoute.ws('/', {
  message(ws, message) {
    ws.send(message)
  },
});

export { wsRoute };
