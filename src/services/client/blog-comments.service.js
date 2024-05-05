import { http } from "../url/baseURL";

export const postBlogComments = (comment, blog_id) => {
  return http.post(`/BlogComment/postBlogComment/${blog_id}`, {
    commentContent: comment,
  });
};

export const editBlogComments = (comment, blog_id) => {
  return http.post(
    `/BlogComment/updateBlogComment`,
    {
      commentContent: comment,
    },
    { params: { blogCommentId: blog_id } }
  );
};

export const deleteBlogComments = (blog_id) => {
  return http.delete(`/BlogComment/blogCommentDelete/${blog_id}`);
};
