import { z } from "zod";

const loginUserSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password must not exceed 50 characters." }),
  userAgent: z.string(),
});

export { loginUserSchema };
