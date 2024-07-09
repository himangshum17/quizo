import { NextFunction, Request, Response } from "express";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // sending the categories
    return res.json({
      status: 200,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    return res.status(500).send();
  }
};
