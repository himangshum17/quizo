import { NameEntry, QuestionandAnswer } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOMEPAGE,
    element: <NameEntry />,
  },
  {
    path: ROUTES.QUESTIOANDANSWER,
    element: <QuestionandAnswer />,
  },
]);
