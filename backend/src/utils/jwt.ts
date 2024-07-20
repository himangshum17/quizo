import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "../config/app.config";

export type RefreshTokenPayload = {
  sessionId: string;
};
export type AccessTokenPayload = {
  userId: string;
  sessionId: string;
};
type SignOptionsandSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptionsandSecret = {
  expiresIn: "15m",
  secret: appConfig.jwtSecret,
};

export const refreshTokenSignOptions: SignOptionsandSecret = {
  expiresIn: "30d",
  secret: appConfig.jwtRefreshSecret,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsandSecret,
) => {
  const { secret, ...signOpts } = options ?? accessTokenSignOptions;
  return jwt.sign(payload, secret, { ...defaults, ...signOpts });
};
