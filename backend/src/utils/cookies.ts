import { CookieOptions, Response } from "express";
import { appConfig } from "../config/app.config";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";
import { ACCESSTOKEN, REFRESHTOKEN } from "../constants/token";

const REFRESH_PATH = "/auth/refresh";

const secure = appConfig.nodeEnv !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};
export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie(ACCESSTOKEN, accessToken, getAccessTokenCookieOptions())
    .cookie(REFRESHTOKEN, refreshToken, getRefreshTokenCookieOptions());

export const clearCookies = (res: Response) =>
  res.clearCookie(ACCESSTOKEN).clearCookie(REFRESHTOKEN, {
    path: REFRESH_PATH,
  });
