import { z } from "zod";
import { loginUserSchema } from "./loginUers.schema";

const createUserSchema = loginUserSchema.extend({
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(50, { message: "Full name must not exceed 50 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(50, { message: "Username must not exceed 50 characters." }),
});

export { createUserSchema };
