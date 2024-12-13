import { catchErrors } from "../utils/catchErrors";

export const getUser = catchErrors(async (req, res) => {
  res.json({ message: "its working" });
});
