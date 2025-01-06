import { RequestHandler } from "express";
import { appAssert } from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import { AppErrorCode } from "../constants/appErrorCode";
import { verifyToken } from "../utils/jwt";

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken =
    (req.cookies.AUTHENTICATED_USER_TOKEN as string) || undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken,
  );

  const { payload, error } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken,
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export { authenticate };
