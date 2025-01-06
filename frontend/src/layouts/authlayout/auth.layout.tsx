import Loader from "@/components/ui/loader";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/routes";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <Loader />;
  }
  if (user) {
    return <Navigate to={ROUTES.SELECTCATEGORY} replace={true} />;
  }

  return <Outlet />;
};

export default AuthLayout;
