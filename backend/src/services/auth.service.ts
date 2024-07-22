import prisma from "../config/db.config";
import { compareValue, hashValue } from "../utils/bcrypt";
import { createSession } from "../utils/session";
import { appAssert } from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";

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
  const sessionInfo = {
    sessionId: session.id,
  };

  // signing the token
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({
    ...sessionInfo,
    userId: user.id,
  });

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
  userAgent: string;
};

const loginUserAccount = async ({
  email,
  password,
  userAgent,
}: LoginUserAccountParams) => {
  // checking if User exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  appAssert(existingUser, UNAUTHORIZED, "Invalid email or password");

  // checking if password correct
  const isPasswordCorrect = await compareValue(password, existingUser.password);
  appAssert(isPasswordCorrect, UNAUTHORIZED, "Invalid email or password");

  // creating the session
  const session = await createSession(existingUser.id, userAgent);
  const sessionInfo = {
    sessionId: session.id,
  };
  // signing the token
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({
    ...sessionInfo,
    userId: existingUser.id,
  });

  // return user and accessToken
  return {
    existingUser,
    accessToken,
    refreshToken,
  };
};

export { createUserAccount, loginUserAccount };
