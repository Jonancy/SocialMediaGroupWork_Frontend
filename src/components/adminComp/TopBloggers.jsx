import React from "react";
import { FaUserCircle } from "react-icons/fa";

const TopBloggers = () => {
  const topBloggers = [
    {
      id: 1,
      name: "John Doe",
      postCount: 50,
      upvotes: 2000,
      downvotes: 50,
      comments: 500,
    },
    {
      id: 2,
      name: "Jane Smith",
      postCount: 40,
      upvotes: 1800,
      downvotes: 60,
      comments: 400,
    },
    // Add more top bloggers as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6  transition duration-300">
      <h2 className="text-3xl font-bold text-center mb-8">Top Bloggers</h2>
      <div className="grid grid-row-1 sm:grid-row-2 lg:grid-row-3 gap-6">
        {topBloggers.map((blogger) => (
          <div
            key={blogger.id}
            className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300"
          >
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-indigo-600 text-4xl mr-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                {blogger.name}
              </h3>
            </div>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Posts:</span> {blogger.postCount}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Upvotes:</span> {blogger.upvotes}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Downvotes:</span>{" "}
              {blogger.downvotes}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Comments:</span>{" "}
              {blogger.comments}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBloggers;
