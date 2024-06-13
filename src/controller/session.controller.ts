import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession(user.id, req.get("user-agent") || "");
  //const session = createSession(user._id, req.get("user-agent") || "");

  // create an access token
  const accesToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accesTokenTtl") }
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  // return acces & refresh tokens
  return res.send({ accesToken, refreshToken });
}
