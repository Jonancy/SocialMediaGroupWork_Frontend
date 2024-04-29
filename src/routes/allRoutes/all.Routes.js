import { adminRoutes } from "../admin/admin.Routes";
import { authRoutes } from "../auth/auth.Routes";
import { clientRoutes } from "../client/client.Routes";
import { errorRoutes } from "../error/error.Routes";

export const allRoutes = [
  ...errorRoutes,
  ...adminRoutes,
  ...clientRoutes,
  ...authRoutes,
];
