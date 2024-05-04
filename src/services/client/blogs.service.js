import { http } from "../url/baseURL";

export const getAllBlogs = (page, sortOrder) => {
  return http.get("/Blog/getAllBlogs", {
    params: { pageNumber: page, sortOrder: sortOrder },
  });
};

export const postBlogs = (formData) => {
  return http.post("/Blog/postBlogs", formData);
};
export const hehe = () => {
  return http.post("/Blog/hee", null);
};

export const specificBlog = (id) => {
  return http.get(`/Blog/specific-blogs/${id}`);
};

export const updateBlogs = (formData, blog_id) => {
  return http.put(`/Blog/updateBlogs/${blog_id}`, formData);
};

export const deleteBlogs = (blog_id) => {
  return http.delete(`/Blog/deleteBlog/${blog_id}`);
};

export const tempDeleteBlogs = (blog_id) => {
  return http.put(`/Blog/deleteBlogTemp/${blog_id}`);
};

export const recoverDeletedBlogs = (blog_id) => {
  return http.put(`/Blog/recoverDeletedBlog/${blog_id}`);
};

export const specificBlogUpdateHistory = (id) => {
  return http.get(`/Blog/getBlogHistory/${id}`);
};
