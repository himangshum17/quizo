import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

type RouteProps = {
  path: string;
  children: React.ReactNode;
};
const ProtectedRoute = ({ path, children }: RouteProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  let location = useLocation();
  return isLoggedIn ? (
    <Routes>
      <Route path={path}>{children}</Route>
    </Routes>
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace={true} />
  );
};

export default ProtectedRoute;
