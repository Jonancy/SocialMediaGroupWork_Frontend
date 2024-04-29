import { lazy } from "react";
const RegisterUser = lazy(() => import("../../pages/client/auth/registerUser"));
const Login = lazy(() => import("../../pages/client/auth/login"));

export const authRoutes = [
  {
    id: "register",
    path: "/register",
    element: RegisterUser,
    hasLayout: false,
    requiredAuth: false,
  },
  {
    id: "login",
    path: "/login",
    element: Login,
    hasLayout: false,
    requiredAuth: false,
  },
];
