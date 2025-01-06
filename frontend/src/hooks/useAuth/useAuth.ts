import { getUser } from "@/services/user/getuser.service";
import { useAppDispatch } from "@/store/hooks";
import { userLogin } from "@/store/reducer/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useAuth = (opts = {}) => {
  const dispatch = useAppDispatch();
  const { data: user, ...rest } = useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
    staleTime: Infinity,
    retry: false,
    ...opts,
  });
  useEffect(() => {
    if (user) {
      dispatch(userLogin(user));
    }
  }, [user, dispatch]);
  return { user, ...rest };
};
export default useAuth;
