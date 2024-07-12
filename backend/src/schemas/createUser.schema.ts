import { z } from "zod";

const createUserSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(50, { message: "Full name must not exceed 50 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(50, { message: "Username must not exceed 50 characters." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password must not exceed 50 characters." }),
});

export { createUserSchema };
