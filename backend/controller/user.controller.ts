import { Request, Response } from "express";
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

    const newUser = await prisma.user.create({
      data: { fullname, username, email, password },
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
