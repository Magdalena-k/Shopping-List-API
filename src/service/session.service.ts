import { ObjectId, FilterQuery } from "mongoose";
import SessionModel, { SchemaDocument } from "../models/session.models";

export async function createSession(userId: ObjectId, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SchemaDocument>) {
  return SessionModel.find(query).lean();
}
