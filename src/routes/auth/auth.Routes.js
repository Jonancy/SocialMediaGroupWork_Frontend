import { lazy } from "react";
const PasswordReset = lazy(() =>
  import("../../pages/client/auth/passwordResetOTP")
);
const EmailVerification = lazy(() =>
  import("../../pages/client/auth/emailVerification")
);
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
  {
    id: "emailVerification",
    path: "/email-verification",
    element: EmailVerification,
    hasLayout: false,
    requiredAuth: false,
  },
  {
    id: "passwordResetOTP",
    path: "/email-verification/passwordResetOTP/:email",
    element: PasswordReset,
    hasLayout: false,
    requiredAuth: false,
  },
];
