import jwt from "jsonwebtoken";
import prisma from "../config/db.config";
import { compareValue, hashValue } from "../utils/bcrypt";
import { appConfig } from "../config/app.config";
import { createSession } from "../utils/session";
import { appAssert } from "../utils/appAssert";
import { CONFLICT } from "../constants/http";

type CreateUserAccountParams = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  userAgent: string;
};
const createUserAccount = async ({
  fullname,
  username,
  email,
  password,
  userAgent,
}: CreateUserAccountParams) => {
  const isUserEmailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  appAssert(!isUserEmailExists, CONFLICT, "Email already in use");
  const passwordHash = await hashValue(password);
  const user = await prisma.user.create({
    data: { fullname, username, email, password: passwordHash },
  });

  // creating the session
  const session = await createSession(user.id, userAgent);

  // signing the token
  const refreshToken = jwt.sign(
    {
      sessionId: session.id,
    },
    appConfig.jwtRefreshSecret,
    {
      audience: ["user"],
      expiresIn: "30d",
    },
  );

  const accessToken = jwt.sign(
    {
      user: user.id,
      sessionId: session.id,
    },
    appConfig.jwtSecret,
    {
      audience: ["user"],
      expiresIn: "15m",
    },
  );

  // return user and accessToken
  return {
    user,
    accessToken,
    refreshToken,
  };
};

type LoginUserAccountParams = {
  email: string;
  password: string;
};

const loginUserAccount = async ({
  email,
  password,
}: LoginUserAccountParams) => {
  // checking if User exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) {
    throw new Error(`Invalid email or password`);
  }

  // checking if password correct
  const isPasswordCorrect = await compareValue(password, existingUser.password);
  if (!isPasswordCorrect) {
    throw new Error(`Invalid email or password`);
  }

  // signing the token
  const accessToken = jwt.sign(
    {
      user: existingUser.id,
    },
    appConfig.jwtSecret,
  );

  // return user and accessToken
  return {
    existingUser,
    accessToken,
  };
};

export { createUserAccount, loginUserAccount };
