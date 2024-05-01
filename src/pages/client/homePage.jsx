import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/client/blogs.service";
import BlogsCard from "../../components/blogs/blogsCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import { heha } from "../../services/client/auth.service";

export default function HomePage() {
  const [getAllBlog, setAllBlogs] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const getBlogs = async () => {
    try {
      const res = await getAllBlogs(page);
      setAllBlogs(res.data.data.blog);
      console.log(res.data);
      setTotalPages(
        Math.ceil(res.data.data.totalBlogs / res.data.data.pageSize)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const hehe = async () => {
    try {
      const res = await heha();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogs();
    hehe();
  }, [page]);

  const handlePageChange = (pageNumber) => {
    // setLoading(true);
    navigate(`/home?page=${pageNumber}`);
  };

  return (
    <div className="w-full flex gap-6 items-center justify-center my-10">
      <div className=" w-[20%]">
        <p>filter</p>
      </div>
      <div className=" flex flex-col  gap-6">
        <div className=" grid grid-cols-3 ">
          {getAllBlog?.map((blog) => (
            <BlogsCard blog={blog} />
          ))}
        </div>
        <div className="flex justify-center  items-center ">
          <Stack spacing={2} className="">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => handlePageChange(value)}
              variant="outlined"
              // shape="rounded"
              className=""
              size="large"
            />
          </Stack>
        </div>
      </div>
      <div className=" w-[20%]">
        <p>notifications</p>
      </div>
    </div>
  );
}
