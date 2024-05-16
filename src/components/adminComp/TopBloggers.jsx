import React, { useState, useEffect, useCallback } from "react";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const TopBloggers = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [blogsPerPage] = useState(3);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5121/GetTopBlogs${
          selectedMonth ? `?month=${formatMonthParam(selectedMonth)}` : ""
        }`
      );
      console.log(response);
      if (response.data.statusCode === "200") {
        setBlogs(response.data.data || []);
        console.log(response.data.data);
      } else {
        console.error("Error fetching blogs:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatMonthParam = (monthName) => {
    const month = months.indexOf(monthName) + 1;
    const year = new Date().getFullYear();
    return `${month.toString().padStart(2, "0")}/${year}`;
  };

  const filteredBlogs = blogs.filter((blog) => {
    const blogTitleIncludesSearchTerm = blog.specificBlog.blogTitle
      ? blog.specificBlog.blogTitle
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : false;
    return blogTitleIncludesSearchTerm;
  });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const displayedBlogs = filteredBlogs.slice(startIndex, endIndex);

  return (
    <div className="mx-12 px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Popular Blogs</h1>
      <div className="flex justify-between mb-6">
        <div className="md:w-64 w-50">
          <InputText
            placeholder="Search"
            value={searchTerm}
            className="border-2 bg-slate-200 border-gray-500 p-1.5 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-64 w-50">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border-2 bg-slate-200 border-gray-500 p-1.5 rounded-md"
          >
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-700">
          <thead className="bg-gray-500">
            <tr className="border-t-2 bg">
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Blog Title
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Author
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Popularity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Date
              </th>
              <th className="pl-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Preview
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-700">
            {displayedBlogs.length > 0 ? (
              displayedBlogs.map((blog) => (
                <tr key={blog.specificBlog.blogId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {blog.specificBlog.blogTitle}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {blog.specificBlog.user.username}
                    </div>{" "}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {blog.popularity}
                    </div>{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {blog.specificBlog.blogCreatedAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={blog.specificBlog.blogImageUrl}
                      alt={blog.specificBlog.blogTitle}
                      className="h-20 w-40 object-cover"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`mx-1 px-3 py-1 rounded hover:bg-gray-400  ${
              currentPage === i + 1 ? "bg-gray-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopBloggers;
