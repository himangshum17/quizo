import { z } from "zod";

const addCategorySchema = z.object({
  categoryName: z.string().min(2, {
    message: "Please enter a categoryName of at least 2 characters.",
  }),
  categoryImage: z
    .string({
      message: "Please enter a categoryImage",
    })
    .url({ message: "Please provide a valid image url." }),
});

export { addCategorySchema };
