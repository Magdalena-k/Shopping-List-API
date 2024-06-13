import { ObjectId, FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.models";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import config from "config";
import UserModel from "../models/user.model";

export async function createSession(userId: ObjectId, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function findSessionById(query: FilterQuery<SessionDocument>) {
  return SessionModel.findById(query).lean();
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return "";

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return "";

  const user = await UserModel.findById(get(decoded, "_id"));

  if (!user) return "";

  const accesToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accesTokenTtl") }
  );

  return accesToken;
}
