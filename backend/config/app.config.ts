import "dotenv/config";

const config = {
  port: process.env.PORT ?? 5000,
};

export const appConfig = Object.freeze(config);
