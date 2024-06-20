import { Request, Response } from "express";
import bcrypt from "bcryptjs";
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

    const newUser = await prisma.user.create({
      data: { fullname, username, email, password: passwordHash },
    });

    return res.json({
      status: 200,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).send();
  }
};
