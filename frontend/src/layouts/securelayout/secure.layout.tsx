import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { CircleUser, Package2 } from "lucide-react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { logoutUser } from "@/services/auth/logout.service";
import { userLogout } from "@/store/reducer/auth";

const SecureLayout = () => {
  const location = useLocation();
  const isLogin = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ["todos"],
      queryFn: logoutUser,
    });
    if (data.message === "Logout successful") {
      dispatch(userLogout({}));
      navigate(ROUTES.LOGIN);
    }
  };

  if (!isLogin) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace={true} />
    );
  }

  return (
    <section>
      {/* header */}
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to={ROUTES.HOMEPAGE}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Quizo</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {/* body */}
      <Outlet />
      {/* footer */}
      <footer className="border-t bg-white py-5">
        <div className="container">
          <p>Quizo. 2024</p>
        </div>
      </footer>
    </section>
  );
};

export default SecureLayout;
