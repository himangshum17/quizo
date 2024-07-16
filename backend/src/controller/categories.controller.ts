import { Request, Response } from "express";
import { catchErrors } from "../utils/catchErrors";
import {
  createCategories,
  fetchCategories,
} from "../services/category.service";
import { CREATED, OK } from "../constants/http";
import { addCategorySchema } from "../schemas/addCategory.schema";

export const getCategories = catchErrors(
  async (req: Request, res: Response) => {
    const allCateGories = await fetchCategories();
    return res.status(OK).json({
      resultObject: allCateGories,
      message: "Categories fetched successfully",
    });
  },
);

export const addCategories = catchErrors(
  async (req: Request, res: Response) => {
    const request = addCategorySchema.parse(req.body);
    const { message } = await createCategories(request);
    return res.status(CREATED).json({ message });
  },
);
