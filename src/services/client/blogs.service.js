import { http } from "../url/baseURL";

export const getAllBlogs = (page) => {
  return http.get("/Blog/getAllBlogs", { params: { pageNumber: page } });
};

export const postBlogs = (formData, id) => {
  return http.post("/Blog/postBlogs", formData, {
    headers: { Authorization: id },
  });
};

export const specificBlog = (id) => {
  return http.get(`/Blog/specific-blogs/${id}`);
};

export const updateBlogs = (formData, blog_id, id) => {
  return http.put(`/Blog/updateBlogs/${blog_id}`, formData, {
    headers: { Authorization: id },
  });
};

export const deleteBlogs = (blog_id, id) => {
  return http.delete(`/Blog/deleteBlog/${blog_id}`, {
    headers: { Authorization: id },
  });
};
