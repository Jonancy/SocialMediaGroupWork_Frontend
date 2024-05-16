// BlogPostCount.jsx
import React from "react";
import { FaEdit } from "react-icons/fa";

const BlogPostCount = ({ allTime, month }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
      <div className="flex items-center mb-4">
        <FaEdit className="text-indigo-600 text-4xl mr-4" />
        <h3 className="text-xl font-bold text-gray-800">Blog Post Count</h3>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600">All Time</span>
        <span className="text-gray-800 font-bold">{allTime?.toString()}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Month</span>
        <span className="text-gray-800 font-bold">{month?.toString()}</span>
      </div>
    </div>
  );
};

export default BlogPostCount;
