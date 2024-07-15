import { CookieOptions, Response } from "express";
import { appConfig } from "../config/app.config";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

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
  path: "/auth/refresh",
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie(
      "AUTHENTICATED_USER_TOKEN",
      accessToken,
      getAccessTokenCookieOptions(),
    )
    .cookie(
      "AUTHENTICATED_USER_REFRESH_TOKEN",
      refreshToken,
      getRefreshTokenCookieOptions(),
    );
