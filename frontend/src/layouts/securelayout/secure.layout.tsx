import { ISLOGIN } from "@/main";
import { ROUTES } from "@/routes";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const SecureLayout = () => {
  const location = useLocation();

  if (!ISLOGIN) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace={true} />
    );
  }

  return <Outlet />;
};

export default SecureLayout;
