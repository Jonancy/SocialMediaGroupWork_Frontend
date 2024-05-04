import React, { useEffect, useState } from "react";
import { specificBlogUpdateHistory } from "../../services/client/blogs.service";
import BlogUpdateHistoryCard from "../../components/blogs/history/blogUpdateHistoryCard";

export default function BlogHistoryModal({ blog_id }) {
  console.log(blog_id);
  const [blogHistory, setBlogHistory] = useState([]);

  const getBlogHistory = async () => {
    try {
      const res = await specificBlogUpdateHistory(blog_id);
      console.log(res.data);
      setBlogHistory(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(blogHistory);
  useEffect(() => {
    getBlogHistory();
  }, []);
  return (
    <div className="w-[30rem] flex flex-col gap-4 ">
      <div className=" text-black font-semibold flex flex-col gap-4">
        {blogHistory?.length > 0 ? (
          blogHistory?.map((history) => (
            <BlogUpdateHistoryCard history={history} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p>No recent updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
