import { CookieOptions, Response } from "express";
import { appConfig } from "../config/app.config";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: appConfig.nodeEnv === "production",
};
export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
});

type Params = {
  res: Response;
  accessToken: string;
};
export const setAuthCookies = ({ res, accessToken }: Params) =>
  res.cookie(
    "AUTHENTICATED_USER_TOKEN",
    accessToken,
    getAccessTokenCookieOptions(),
  );
