// CumulativeStats.jsx
import React, { useState } from "react";
import BlogPostCount from "./BlogPostCount";
import UpvoteCount from "./UpvoteCount";
import DownvoteCount from "./DownvoteCount";
import CommentCount from "./CommentCount";

const CumulativeStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState("All Time");
  const [data, setData] = useState({
    allTimeBlogPosts: 1000,
    monthlyBlogPosts: 50,
    allTimeUpvotes: 5000,
    monthlyUpvotes: 250,
    allTimeDownvotes: 200,
    monthlyDownvotes: 10,
    allTimeComments: 2000,
    monthlyComments: 100,
  });

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6  transition duration-300">
      <h2 className="text-3xl font-bold text-center mb-6">Cumulative Stats</h2>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 font-semibold">Select Month</span>
        <select
          value={month}
          onChange={handleMonthChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-600 transition duration-300"
        >
          <option value="All Time">All Time</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <BlogPostCount
        allTime={formatNumber(data.allTimeBlogPosts)}
        month={formatNumber(data.monthlyBlogPosts)}
      />
      <UpvoteCount
        allTime={formatNumber(data.allTimeUpvotes)}
        month={formatNumber(data.monthlyUpvotes)}
      />
      <DownvoteCount
        allTime={formatNumber(data.allTimeDownvotes)}
        month={formatNumber(data.monthlyDownvotes)}
      />
      <CommentCount
        allTime={formatNumber(data.allTimeComments)}
        month={formatNumber(data.monthlyComments)}
      />
    </div>
  );
};

export default CumulativeStats;
