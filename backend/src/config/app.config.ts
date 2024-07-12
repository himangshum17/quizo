import "dotenv/config";
import { getEnv } from "../utils/coreutils";

const config = {
  port: getEnv("PORT", "5000"),
  nodeEnv: getEnv("NODE_ENV"),
  jwtSecret: getEnv("JWT_SECRET"),
  appOrigin: getEnv("APP_ORIGIN"),
};

export const appConfig = Object.freeze(config);
