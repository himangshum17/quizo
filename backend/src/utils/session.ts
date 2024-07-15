import prisma from "../config/db.config";
import { thirtyDaysFromNow } from "./date";

export const createSession = async (userId: string, userAgent: string) => {
  const session = await prisma.session.create({
    data: {
      userId,
      userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  return session;
};
