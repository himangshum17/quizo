import assert from "assert";
import { AppError } from "./apperror";
import { HttpStatusCode } from "../constants/http";
import { AppErrorCode } from "../constants/appErrorCode";

type AppAssert = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode,
) => asserts condition;

/**
 * Assets a condition and throws an error if the condition is false.
 */
export const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode,
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));
