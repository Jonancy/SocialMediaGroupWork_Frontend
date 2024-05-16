import React, { useState, useEffect, useCallback } from "react";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const TopBloggers = () => {
  const [topBloggers, setTopBloggers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [bloggersPerPage] = useState(5);

  const fetchTopBloggers = useCallback(async () => {
    try {
      const monthParam = selectedMonth
        ? `month=${formatMonthParam(selectedMonth)}`
        : "";
      const response = await axios.get(
        `http://localhost:5121/GetTopBlogger?${monthParam}`
      );
      if (response.data.statusCode === "200") {
        setTopBloggers(response.data.data || []);
        console.log(response.data.data);
      } else {
        console.error("Error fetching top bloggers:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching top bloggers:", error);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchTopBloggers();
  }, [fetchTopBloggers]);

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

  const totalPages = Math.ceil(topBloggers.length / bloggersPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * bloggersPerPage;
  const endIndex = startIndex + bloggersPerPage;
  const displayedBloggers = topBloggers.slice(startIndex, endIndex);

  return (
    <div className="mx-12 px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Top Bloggers</h1>
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
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Popularity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-700">
            {displayedBloggers.length > 0 ? (
              displayedBloggers.map((blogger) => (
                <tr key={blogger.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {blogger.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-gray-600">
                        {blogger.popularityScore}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center">
                  No bloggers found.
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
