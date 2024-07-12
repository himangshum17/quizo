import jwt from "jsonwebtoken";
import prisma from "../config/db.config";
import { hashValue } from "../utils/bcrypt";
import { appConfig } from "../config/app.config";

type CreateUserAccountParams = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};
const createUserAccount = async ({
  fullname,
  username,
  email,
  password,
}: CreateUserAccountParams) => {
  const isUserEmailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserEmailExists) {
    throw new Error(`User already exists`);
  }
  const passwordHash = await hashValue(password);
  const user = await prisma.user.create({
    data: { fullname, username, email, password: passwordHash },
  });

  // signing the token
  const accessToken = jwt.sign(
    {
      user: user.id,
    },
    appConfig.jwtSecret,
  );

  // return user and accessToken
  return {
    user,
    accessToken,
  };
};

export { createUserAccount };
