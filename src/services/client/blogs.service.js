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
