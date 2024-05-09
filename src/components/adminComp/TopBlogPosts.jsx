// TopBlogPosts.jsx
import React from "react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";

const TopBlogPosts = () => {
  const topPosts = [
    {
      id: 1,
      title: "How to Build a React App",
      author: "John Doe",
      upvotes: 500,
      downvotes: 10,
      comments: 100,
    },
    {
      id: 2,
      title: "Mastering JavaScript",
      author: "Jane Smith",
      upvotes: 400,
      downvotes: 15,
      comments: 80,
    },
    // Add more top posts as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6  transition duration-300">
      <h2 className="text-3xl font-bold text-center mb-6">Top Blog Posts</h2>
      <ul className="space-y-4">
        {topPosts.map((post) => (
          <li
            key={post.id}
            className="bg-gray-100 p-4 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out transform hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
              <span className="text-gray-600 font-semibold">
                by {post.author}
              </span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <FaThumbsUp className="text-indigo-600 mr-2" />
                <span className="text-gray-600">{post.upvotes}</span>
              </div>
              <div className="flex items-center">
                <FaThumbsDown className="text-red-600 mr-2" />
                <span className="text-gray-600">{post.downvotes}</span>
              </div>
              <div className="flex items-center">
                <FaComment className="text-gray-600 mr-2" />
                <span className="text-gray-600">{post.comments}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopBlogPosts;
