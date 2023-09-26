import mongoose from "mongoose";

const MessageEntity = {
  senderId: {
    type: String,
  },
  groupId: {
    type: String,
  },
  content: {
    type: String,
  }
}

const schema = new mongoose.Schema(MessageEntity, {
  versionKey: false, 
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

schema.index({ content: 1 }, { unique: true })

export const UserModel = mongoose.model('Message', schema);

