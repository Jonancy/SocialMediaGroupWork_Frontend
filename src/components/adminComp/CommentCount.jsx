// CommentCount.jsx
import React from "react";
import { FaCommentAlt } from "react-icons/fa";

const CommentCount = ({ allTime, month }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
      <div className="flex items-center mb-4">
        <FaCommentAlt className="text-black text-4xl mr-4" />
        <h3 className="text-xl font-bold text-gray-800">Comment Count</h3>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600">All Time</span>
        <span className="text-gray-800 font-bold">{allTime}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Month</span>
        <span className="text-gray-800 font-bold">{month}</span>
      </div>
    </div>
  );
};

export default CommentCount;
