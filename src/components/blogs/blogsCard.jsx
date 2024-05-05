import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { BiComment, BiDownvote, BiUpvote } from "react-icons/bi";

export default function BlogsCard({ blog }) {
  console.log(blog);
  return (
    <div className="container mx-auto border w-[50rem] bg-gray-50 rounded-lg ">
      <Link
        to={`/specific-blogs/${blog.blogId}`}
        className=" flex flex-col rounded-lg cursor-pointer transition-all duration-500 hover:shadow-md "
      >
        <img
          alt=""
          className="object-cover w-full h-52  dark:bg-gray-500 rounded-t-lg"
          src={blog?.blogImageUrl}
          loading="lazy"
        />
        <div className="flex flex-col flex-1 p-6  ">
          <a className=" font-semibold text-lg  first-letter:capitalize hover:underline duration-300 line-clamp-2 ">
            {blog?.blogTitle}
          </a>
          <h3 className="flex-1  text-gray-400 text-sm  line-clamp-4  mt-2 mb-1">
            {blog?.blogContent}
          </h3>
          <div className="flex gap-4 items-center text-xs my-2">
            <div className="flex gap-1 items-center">
              <BiUpvote />
              {blog?.totalUpVote} votes
            </div>
            <div className="flex gap-1 items-center">
              <BiDownvote />
              {blog?.totalDownVote} votes
            </div>
            <div className="flex gap-1 items-center">
              <BiComment />
              {blog?.totalComment} comments
            </div>
          </div>
          <div className="flex flex-col text-xs dark:text-gray-600">
            <p>Posted by: {blog?.user?.username}</p>
            <span>{blog?.blogCreatedAt}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

BlogsCard.propType = {
  blog: PropTypes.object.isRequired,
};
