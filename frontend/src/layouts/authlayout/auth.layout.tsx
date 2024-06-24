import { ISLOGIN } from "@/main";
import { ROUTES } from "@/routes";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  if (ISLOGIN) {
    return <Navigate to={ROUTES.SELECTCATEGORY} replace={true} />;
  }

  return <Outlet />;
};

export default AuthLayout;
