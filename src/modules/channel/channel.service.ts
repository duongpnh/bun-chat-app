import { InternalServerError } from "elysia";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { ChannelModel } from "@channel/channel.schema";
import { InitiateChannelDto } from "@channel/dto/initiate.dto";

export class ChannelService {
  async initiateChannel(channel: InitiateChannelDto): Promise<string | undefined> {
    try {
      const id = new mongoose.mongo.ObjectId();
      const newChannel = {
        _id: id,
        ...channel,
      };
      console.log("🚀 ~ file: channel.service.ts:15 ~ ChannelService ~ initiateChannel ~ newChannel:", newChannel)

      const res = await ChannelModel.create(newChannel);

      return httpStatus[httpStatus.CREATED];
    } catch (e) {
      console.log("🚀 ~ file: channel.service.ts:21 ~ ChannelService ~ initiateChannel ~ e:", e)
      throw new InternalServerError(JSON.stringify(e));
    }
  }
}