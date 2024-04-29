import { lazy } from "react";
const Error404 = lazy(() => import("../../pages/error/error404"));

export const errorRoutes = [
  {
    id: "error404",
    path: "*",
    element: Error404,
  },
];
