import { Login, NameEntry, QuestionandAnswer, SelectCategory } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE,
    element: <NameEntry />,
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
]);
