import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import prisma from "../config/db.config";
import { catchErrors } from "../utils/catchErrors";
import { createUserSchema } from "../schemas/createUser.schema";
import { createUserAccount } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";
import { CREATED } from "../constants/http";

export const createUser = catchErrors(async (req: Request, res: Response) => {
  const request = createUserSchema.parse(req.body);
  const { user, accessToken } = await createUserAccount(request);
  return setAuthCookies({ res, accessToken })
    .status(CREATED)
    .json({
      resultObject: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
      message: "User created successfully",
    });
});

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      const error = createHttpError(400, "Please enter all required fields.");
      return next(error);
    }

    if (password.length < 8) {
      const error = createHttpError(
        400,
        "Please enter a password of at least 8 characters.",
      );
      return next(error);
    }

    // checking if User exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      const error = createHttpError(401, "Wrong email or password.");
      return next(error);
    }

    // checking if password correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      const error = createHttpError(401, "Wrong email or password.");
      return next(error);
    }

    // signing the token
    const token = jwt.sign(
      {
        user: existingUser.id,
      },
      process.env.JWT_SECRET as string,
    );

    // sending the token as a HTTP-only cookie and userObject
    return res
      .cookie("AUTHENTICATED_USER_TOKEN", token, {
        httpOnly: true,
      })
      .json({
        status: 200,
        resultObject: {
          id: existingUser.id,
          fullname: existingUser.fullname,
          username: existingUser.username,
          email: existingUser.email,
        },
        message: "User loggedin successfully",
      });
  } catch (error) {
    return res.status(500).send();
  }
};

export const logoutUser = (req: Request, res: Response) => {
  return res
    .cookie("AUTHENTICATED_USER_TOKEN", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};
