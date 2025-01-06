import prisma from "../config/db.config";
import { NOT_FOUND, OK } from "../constants/http";
import { appAssert } from "../utils/appAssert";
import { catchErrors } from "../utils/catchErrors";

export const getUser = catchErrors(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });
  appAssert(user, NOT_FOUND, "User not found");
  res.status(OK).json({
    resultObject: {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    },
    message: "User fetched successfully",
  });
});
