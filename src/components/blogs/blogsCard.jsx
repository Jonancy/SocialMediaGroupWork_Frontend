import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function BlogsCard({ blog }) {
  console.log(blog);
  return (
    <div className="container p-6 mx-auto space-y-8">
      <Link
        to={`/specific-blogs/${blog.blogId}`}
        className="flex flex-col dark:bg-gray-50 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-95"
      >
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Te nulla oportere reprimique his dolorum"
        >
          <img
            alt=""
            className="object-cover w-full h-52 dark:bg-gray-500 rounded-t-lg"
            src={blog?.blogImageUrl}
          />
        </a>
        <div className="flex flex-col flex-1 p-6">
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Te nulla oportere reprimique his dolorum"
          ></a>
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-xs tracking-wider uppercase hover:underline dark:text-emerald-600"
          >
            {blog?.blogTitle}
          </a>
          <h3 className="flex-1 py-2 text-lg font-semibold leading-snug line-clamp-3">
            {" "}
            {blog?.blogContent}
          </h3>
          <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
            <span>June 1, 2020</span>
            <span>2.1K views</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

BlogsCard.propType = {
  blog: PropTypes.object.isRequired,
};