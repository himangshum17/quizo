import { Request, Response } from "express";
import { catchErrors } from "../utils/catchErrors";
import { createUserSchema } from "../schemas/createUser.schema";
import { createUserAccount, loginUserAccount } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";
import { CREATED, OK } from "../constants/http";
import { loginUserSchema } from "../schemas/loginUers.schema";

export const createUser = catchErrors(async (req: Request, res: Response) => {
  const request = createUserSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { user, accessToken, refreshToken } = await createUserAccount(request);
  return setAuthCookies({ res, accessToken, refreshToken })
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

export const loginUser = catchErrors(async (req: Request, res: Response) => {
  const request = loginUserSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { existingUser, accessToken, refreshToken } =
    await loginUserAccount(request);
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({
      resultObject: {
        id: existingUser.id,
        fullname: existingUser.fullname,
        username: existingUser.username,
        email: existingUser.email,
      },
      message: "User loggedin successfully",
    });
});

export const logoutUser = (req: Request, res: Response) => {
  return res
    .cookie("AUTHENTICATED_USER_TOKEN", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};
