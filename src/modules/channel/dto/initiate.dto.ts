import { t } from "elysia";

export class InitiateChannelDto {
  name: string;
}

export const initiateChannelValidation = {
  body: t.Object({
    name: t.String(),
  })
};
