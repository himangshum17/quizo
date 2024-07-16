import prisma from "../config/db.config";
import { CONFLICT } from "../constants/http";
import { appAssert } from "../utils/appAssert";

export const fetchCategories = async () => {
  // fetching all categories from DB
  const allCateGories = await prisma.categories.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return allCateGories;
};

type CreateCategoriesParams = {
  categoryName: string;
  categoryImage: string;
};

export const createCategories = async ({
  categoryName,
  categoryImage,
}: CreateCategoriesParams) => {
  const isCategoryNameExists = await prisma.categories.findUnique({
    where: {
      categoryName,
    },
  });
  appAssert(
    !isCategoryNameExists,
    CONFLICT,
    "Category already exists, Please use another Category.",
  );
  await prisma.categories.create({
    data: { categoryName, categoryImage },
  });
  return { message: "Category added successfully" };
};
