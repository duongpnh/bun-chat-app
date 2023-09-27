import { InternalServerError } from 'elysia';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'hcm nhung ngay mua';

interface IPayload {
  userId: string;
}

export const encode = (userId: string) => {
  try {
    const payload: IPayload = {
      userId,
    };
    console.log("🚀 ~ file: jwt.ts:11 ~ encode ~ payload:", payload, SECRET_KEY)

    return jwt.sign(payload, SECRET_KEY);;
  } catch (error) {
    throw new InternalServerError('Encode error');
  }
};

export const verify = (token: string): IPayload => {
  try {

    const decoded = jwt.verify(token, SECRET_KEY);

    return decoded as IPayload;
  } catch (error) {
    throw new InternalServerError('Verify error');
  }
}