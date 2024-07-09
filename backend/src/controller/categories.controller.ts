import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../config/db.config";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // fetching all categories from DB
    const allCateGories = await prisma.categories.findMany();
    // sending the categories
    return res.json({
      status: 200,
      resultObject: allCateGories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    return res.status(500).send();
  }
};

export const addCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryName, categoryImage } = req.body;

    // validation
    if (!categoryName || !categoryImage) {
      const error = createHttpError(400, "Please enter all required fields.");
      return next(error);
    }

    if (categoryName.length < 2) {
      const error = createHttpError(
        400,
        "Please enter a categoryName of at least 2 characters.",
      );
      return next(error);
    }

    const isCategoryNameExists = await prisma.categories.findUnique({
      where: {
        categoryName,
      },
    });

    if (isCategoryNameExists) {
      const error = createHttpError(
        400,
        "Category name already exists, please use another Category name.",
      );
      return next(error);
    }

    // createting the new category in DB
    const newCategory = await prisma.categories.create({
      data: { categoryName, categoryImage },
    });

    // sending the categories
    return res.json({
      status: 200,
      resultObject: {
        id: newCategory.id,
        categoryName: newCategory.categoryName,
        categoryImage: newCategory.categoryImage,
      },
      message: "Category added successfully",
    });
  } catch (error) {
    return res.status(500).send();
  }
};
