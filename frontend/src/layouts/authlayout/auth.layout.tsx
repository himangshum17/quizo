import { ROUTES } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isLogin = useAppSelector((state) => state.auth.isLoggedIn);
  if (isLogin) {
    return <Navigate to={ROUTES.SELECTCATEGORY} replace={true} />;
  }

  return <Outlet />;
};

export default AuthLayout;
