import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogPostCount from "./BlogPostCount";
import UpvoteCount from "./UpvoteCount";
import DownvoteCount from "./DownvoteCount";
import CommentCount from "./CommentCount";

const CumulativeStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState("");
  const [data, setData] = useState({
    allTimeBlogPosts: 0,
    monthlyBlogPosts: 0,
    allTimeUpvotes: 0,
    monthlyUpvotes: 0,
    allTimeDownvotes: 0,
    monthlyDownvotes: 0,
    allTimeComments: 0,
    monthlyComments: 0,
  });

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value || "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5121/GetCumulativeCounts?month=${month || ""}`
        );
        const mappedData = {
          allTimeBlogPosts: response.data.data.blogPostsCount,
          monthlyBlogPosts: response.data.data.monthPostsCount,
          allTimeUpvotes: response.data.data.upvotesCount,
          monthlyUpvotes: response.data.data.monthUpvotesCount,
          allTimeDownvotes: response.data.data.downvotesCount,
          monthlyDownvotes: response.data.data.monthDownvotesCount,
          allTimeComments: response.data.data.commentsCount,
          monthlyComments: response.data.data.monthCommentsCount,
        };
        setData(mappedData);
        console.log(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [month]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-12">
      <h2 className="text-3xl font-bold text-center mb-6">Cumulative Stats</h2>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 font-semibold">Select Month</span>
        <select
          value={month}
          onChange={handleMonthChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-600 transition duration-300"
        >
          <option value="">All Time</option>
          <option value="01/2024">January </option>
          <option value="02/2024">February</option>
          <option value="03/2024">March </option>
          <option value="04/2024">April </option>
          <option value="05/2024">May </option>
          <option value="06/2024">June </option>
          <option value="07/2024">July </option>
          <option value="08/2024">August </option>
          <option value="09/2024">September </option>
          <option value="10/2024">October </option>
          <option value="11/2024">November </option>
          <option value="12/2024">December </option>
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
