import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
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

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string },
) => {
  const { secret = appConfig.jwtSecret, ...verifyOpts } = options ?? {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as TPayload;
    return {
      payload,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
