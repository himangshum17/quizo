import {
  ForgotPassword,
  Login,
  QuestionandAnswer,
  Register,
  SelectCategory,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/routes";
import ProtectedRoute from "./protected.route";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE,
    element: <Login />,
  },
  {
    path: `${ROUTES.QUESTIOANDANSWER}/:id`,
    element: (
      <ProtectedRoute path={`/${ROUTES.QUESTIOANDANSWER}/:id`}>
        <QuestionandAnswer />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.SELECTCATEGORY,
    element: (
      <ProtectedRoute path={`/${ROUTES.SELECTCATEGORY}`}>
        <SelectCategory />
      </ProtectedRoute>
    ),
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
