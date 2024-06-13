import { ObjectId } from "mongoose";
import SessionModel from "../models/session.models";

export async function createSession(userId: ObjectId, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}
