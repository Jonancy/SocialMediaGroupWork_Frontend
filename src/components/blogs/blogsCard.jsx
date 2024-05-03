import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function BlogsCard({ blog }) {
  return (
    <div className="container p-6 mx-auto space-y-8 w-[50rem]">
      <Link
        to={`/specific-blogs/${blog.blogId}`}
        className="flex   border rounded-lg cursor-pointer transition-all duration-500 hover:shadow-md "
      >
        <img
          alt=""
          className="object-cover w-[20rem] h-52 dark:bg-gray-500 rounded-t-lg"
          src={blog?.blogImageUrl}
        />
        <div className="flex flex-col flex-1 p-6">
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Te nulla oportere reprimique his dolorum"
          ></a>
          <a
            rel="noopener noreferrer"
            href="#"
            className=" font-semibold text-xl tracking-wider uppercase hover:underline line-clamp-3 "
          >
            {blog?.blogTitle}
          </a>
          <h3 className="flex-1 py-2  text-gray-400 leading-snug line-clamp-2">
            {" "}
            {blog?.blogContent}
          </h3>
          <div className="flex flex-col pt-3 text-xs dark:text-gray-600">
            <p>User name</p>
            <span>June 1, 2020</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

BlogsCard.propType = {
  blog: PropTypes.object.isRequired,
};
