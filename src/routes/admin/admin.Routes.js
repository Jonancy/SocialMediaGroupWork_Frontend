import { lazy } from "react";
const AdminDash = lazy(() => import("../../pages/admin/adminDash"));

export const adminRoutes = [
  {
    id: "adminDash",
    path: "/admin/:admin_id/adminDash",
    element: AdminDash,
    hasAdminLayout: true,
  },
];
