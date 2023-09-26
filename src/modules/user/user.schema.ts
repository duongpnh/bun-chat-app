import mongoose from "mongoose";

const UserEntity = {
  firstName: {
    type: String,
    unique: false,
  },
  lastName: {
    type: String,
    unique: false,
  },
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    unique: false,
  },
  avatar: {
    type: String,
    default: null,
  },
}

const schema = new mongoose.Schema(UserEntity, {
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

schema.index({ username: 1, email: 1 }, { unique: true })

export const UserModel = mongoose.model('User', schema);

