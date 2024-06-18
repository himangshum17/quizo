import {
  ForgotPassword,
  Login,
  QuestionandAnswer,
  Register,
  SelectCategory,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE,
    element: <Login />,
  },
  {
    path: `${ROUTES.QUESTIOANDANSWER}/:id`,
    element: <QuestionandAnswer />,
  },
  {
    path: ROUTES.SELECTCATEGORY,
    element: <SelectCategory />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.FORGOTPASSWORD,
    element: <ForgotPassword />,
  },
]);
