import httpStatus from "http-status";
import { InitiateChannelDto } from "@channel/dto/initiate.dto";
import { ChannelModel } from "@channel/channel.schema";
import { ChannelService } from "@channel/channel.service";
import { ChannelDto } from "./dto/channel.dto";

export class ChannelController {
  private _service: ChannelService;
  
  constructor() {
    this._service = new ChannelService();
  }

  getChannels() {
    return ChannelModel.find();
  }

  async initiateChannel(payload: InitiateChannelDto): Promise<string | undefined> {
    await this._service.initiateChannel(payload);

    return httpStatus[httpStatus.CREATED];
  }

  async getChannelById(id: string): Promise<ChannelDto | null> {
    return ChannelModel.findById(id);
  }
}