import { Navigate, createBrowserRouter } from "react-router-dom";
import { ROUTES, AUTH_ROUTE_PREFIX, SECURE_ROUTE_PREFIX } from "@/routes";
import {
  ForgotPassword,
  Login,
  QuestionandAnswer,
  Register,
  SelectCategory,
} from "@/pages";
import { AuthLayout, SecureLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE,
    element: <Navigate to={ROUTES.SELECTCATEGORY} />,
  },
  {
    path: SECURE_ROUTE_PREFIX,
    element: <SecureLayout />,
    children: [
      {
        path: `${ROUTES.QUESTIOANDANSWER}/:id`,
        element: <QuestionandAnswer />,
      },
      {
        path: ROUTES.SELECTCATEGORY,
        element: <SelectCategory />,
      },
    ],
  },
  {
    path: AUTH_ROUTE_PREFIX,
    element: <AuthLayout />,
    children: [
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
    ],
  },
]);
