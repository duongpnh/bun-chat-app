import { CollectionName } from "@enums/collection.enum";
import mongoose from "mongoose";

const ChannelEntity = {
  name: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  coverImage: {
    type: String,
    default: null,
  }
}

const schema = new mongoose.Schema(ChannelEntity, {
  versionKey: false, 
  timestamps: true,
  collection: CollectionName.CHANNELS,
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

schema.index({ name: 1 }, { unique: true })

export const ChannelModel = mongoose.model('Channel', schema);

