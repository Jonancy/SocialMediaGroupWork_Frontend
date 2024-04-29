import { lazy } from "react";
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
];
