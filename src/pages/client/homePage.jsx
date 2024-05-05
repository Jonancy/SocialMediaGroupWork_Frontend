import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/client/blogs.service";
import BlogsCard from "../../components/blogs/blogsCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Stack, Checkbox, Button } from "@mui/material";

export default function HomePage() {
  const [getAllBlog, setAllBlogs] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState(
    queryParams.get("sortOrder") || null
  ); // To store filter type
  const navigate = useNavigate();

  const getBlogs = async () => {
    try {
      const res = await getAllBlogs(page, sortOrder);
      setAllBlogs(res.data.data.blog);
      setTotalPages(
        Math.ceil(res.data.data.totalBlogs / res.data.data.pageSize)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page, sortOrder]); // Watch for changes in both page and order

  const handlePageChange = (pageNumber) => {
    navigate(`/home?page=${pageNumber}`);
  };
  const handleFilterChange = (filter) => {
    if (sortOrder !== filter) {
      // Toggle off if the filter is already selected
      const newOrder = sortOrder === filter ? "" : filter;
      setSortOrder(newOrder);
      navigate(`/home?page=${page}&sortOrder=${newOrder}`);
    } else {
      setSortOrder("");
      navigate(`/home?page=${page}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  my-10">
      <div className=" sticky top-16 w-full flex flex-col items-center justify-center shadow-sm bg-white">
        <p className="font-bold mb-2 text-xl">Filter by:</p>
        <div className="flex gap-4">
          <div className="flex items-center mb-2 ">
            <Button
              variant={sortOrder === "random" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("random")}
            >
              Random
            </Button>
          </div>
          <div className="flex items-center mb-2">
            <Button
              variant={sortOrder === "popularity" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("popularity")}
            >
              Popularity
            </Button>
          </div>
          <div className="flex items-center mb-2">
            <Button
              variant={sortOrder === "recent" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("recent")}
            >
              Recent
            </Button>
          </div>
        </div>
      </div>
      <div className="w-3/4">
        <div className="grid grid-cols-1 gap-4">
          {getAllBlog.map((blog) => (
            <BlogsCard key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => handlePageChange(value)}
            variant="outlined"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
