import { lazy } from "react";
const PasswordResetProfile = lazy(() =>
  import("../../pages/client/auth/passwordResetProfile")
);
const UpdateBlogs = lazy(() => import("../../pages/client/blogs/editBlog"));
const UserProfile = lazy(() => import("../../pages/client/userProfile"));
const BlogsMainPage = lazy(() =>
  import("../../pages/client/blogs/blogsMainPage")
);
const PostBlogs = lazy(() => import("../../pages/client/blogs/postBlogs"));
const HomePage = lazy(() => import("../../pages/client/homePage"));

export const clientRoutes = [
  {
    id: "home",
    path: "/home",
    element: HomePage,
    hasClientLayout: true,
  },
  {
    id: "postBlogs",
    path: "/post-blogs",
    element: PostBlogs,
    hasClientLayout: true,
  },
  {
    id: "specificBlogs",
    path: "/specific-blogs/:blog_id",
    element: BlogsMainPage,
    hasClientLayout: true,
  },

  {
    id: "specificUser",
    path: "/specific-user/:user_id",
    element: UserProfile,
    hasClientLayout: true,
  },
  {
    id: "editBlogs",
    path: "/edit-blogs/:blog_id",
    element: UpdateBlogs,
    hasClientLayout: true,
  },
  {
    id: "updatePass",
    path: "/specific-user/:user_id/updatePassword",
    element: PasswordResetProfile,
    hasClientLayout: true,
  },
];
