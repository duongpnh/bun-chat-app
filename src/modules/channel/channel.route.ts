import Elysia from "elysia"
import { ChannelController } from "./channel.controller";
import { initiateChannelValidation } from "./dto/initiate.dto";
import { DecoratorBase, MaybeArray, MergeSchema, OptionalHandler, RouteSchema } from "elysia/dist/types";
import { verify } from "@middleware/jwt";

const route = new Elysia({ prefix: '/channels' })
const controller = new ChannelController();

route.get('/', () => controller.getChannels());
route.get('/:id', ({ params: { id } }) => controller.getChannelById(id));
route.post('/', ({ body }) => controller.initiateChannel(body), initiateChannelValidation);

export { route };
