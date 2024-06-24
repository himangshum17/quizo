export const AUTH_ROUTE_PREFIX = "/auth";
export const SECURE_ROUTE_PREFIX = "/home";

export const ROUTES = {
  HOMEPAGE: "/",
  QUESTIOANDANSWER: `${SECURE_ROUTE_PREFIX}/questionandanswer`,
  SELECTCATEGORY: `${SECURE_ROUTE_PREFIX}/selectcategory`,
  LOGIN: `${AUTH_ROUTE_PREFIX}/login`,
  REGISTER: `${AUTH_ROUTE_PREFIX}/register`,
  FORGOTPASSWORD: `${AUTH_ROUTE_PREFIX}/forgotpassword`,
};
