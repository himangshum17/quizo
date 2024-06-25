import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    // validation
    if (!fullname || !username || !email || !password) {
      return res.json({
        status: 400,
        message: "Please enter all required fields.",
      });
    }

    if (username.length < 2) {
      return res.json({
        status: 400,
        message: "Please enter a username of at least 2 characters.",
      });
    }

    if (password.length < 8) {
      return res.json({
        status: 400,
        message: "Please enter a password of at least 8 characters.",
      });
    }

    const isUserEmailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserEmailExists) {
      return res.json({
        status: 400,
        message: "Email already exists, please use another email",
      });
    }

    // hasing the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // createting the new user in DB
    const newUser = await prisma.user.create({
      data: { fullname, username, email, password: passwordHash },
    });

    // signing the token
    const token = jwt.sign(
      {
        user: newUser.id,
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
          id: newUser.id,
          fullname: newUser.fullname,
          username: newUser.username,
          email: newUser.email,
        },
        message: "User created successfully",
      });
  } catch (error) {
    return res.status(500).send();
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.json({
        status: 400,
        message: "Please enter all required fields.",
      });
    }

    if (password.length < 8) {
      return res.json({
        status: 400,
        message: "Please enter a password of at least 8 characters.",
      });
    }

    // checking if User exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res.json({
        status: 401,
        message: "Wrong email or password.",
      });
    }

    // checking if password correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      return res.json({
        status: 401,
        message: "Wrong email or password.",
      });
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
