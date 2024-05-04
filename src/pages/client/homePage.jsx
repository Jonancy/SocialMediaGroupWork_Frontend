import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/client/blogs.service";
import BlogsCard from "../../components/blogs/blogsCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Stack, Checkbox } from "@mui/material";

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
    <div className="flex justify-center items-start my-10 space-x-6">
      <div className="w-1/4">
        <p className="font-bold mb-2">Filter:</p>
        <div className="flex items-center mb-2">
          <Checkbox
            checked={sortOrder === "random"}
            onChange={() => handleFilterChange("random")}
          />
          <label className="ml-2">Random</label>
        </div>
        <div className="flex items-center mb-2">
          <Checkbox
            checked={sortOrder === "popularity"}
            onChange={() => handleFilterChange("popularity")}
          />
          <label className="ml-2">Popularity</label>
        </div>
        <div className="flex items-center mb-2">
          <Checkbox
            checked={sortOrder === "recent"}
            onChange={() => handleFilterChange("recent")}
          />
          <label className="ml-2">Recent</label>
        </div>
      </div>
      <div className="w-3/4">
        <div className="grid grid-cols-1 gap-6">
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
