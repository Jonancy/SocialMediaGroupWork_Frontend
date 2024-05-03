import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { specificBlog } from "../../../services/client/blogs.service";
import { IoIosArrowForward } from "react-icons/io";
import { BiCalendar, BiUpvote } from "react-icons/bi";
import { FiTag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function BlogsMainPage() {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const getBlogDetails = async () => {
    try {
      const res = await specificBlog(blog_id);
      console.log(res.data);
      setBlog(res.data.data.specificBlog);
      setSuggestions(res.data.data.blogSuggestions);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [blog_id]);
  return (
    <div>
      <div className="p-6 px-32 relative">
        <div className="rounded-2xl h-[26rem] relative">
          <div className="absolute inset-0">
            <img
              alt="billie"
              className="rounded-2xl h-full w-full object-cover"
              src={blog.blogImageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 rounded-2xl"></div>
          </div>
          <div className="absolute flex justify-center items-center bottom-[18%] w-full text-center h-fit ">
            <div className=" w-[45rem]">
              <p className="text-white text-2xl font-bold uppercase">
                {blog.blogTitle}
              </p>
            </div>
          </div>
        </div>
        <div className="flex pt-10 ">
          <div className="flex flex-col border-r border-r-black pr-16 w-full">
            <div className="bg-gray-200 rounded-lg p-4 flex gap-10 items-center text-lg font-semibold">
              <div className="flex items-center gap-2">
                <Link to={"/blogs"}>
                  <div
                    className=" hover:bg-gray-300 p-1 rounded-lg relative cursor-pointer"
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                  >
                    <p>Blogs</p>
                    {/* {hoverReturn && (
                      <div className="absolute -top-7 -right-10 z-40  rounded-lg p-1 text-sm bg-white">
                        <p>return</p>
                      </div>
                    )} */}
                  </div>
                </Link>
                <IoIosArrowForward />
                hehe
                {/* {blog.blog_Tag?.tag_name} */}
              </div>
              <div className="flex items-center gap-2">
                <BiCalendar />
                <p>{blog?.blogCreatedAt}</p>
                {/* {formatDate(blog?.createdAt)} */}
              </div>
              <div className="flex items-center gap-2">
                <FiTag />
                tag
                {/* {blog.blog_Tag?.tag_name} */}
              </div>
              <div
                className="flex justify-end cursor-pointer"
                // onClick={likeBlogss}
              >
                {/* <FaHeart
                  className={`${likedBlog ? "text-violet-950" : "text-white"} `}
                /> */}
                <BiUpvote />
              </div>
            </div>
            <div className="border-t mt-6 pt-6">
              <p className="tracking-wider leading-7">{blog.blogContent}</p>
            </div>
            <div className=" pt-6">
              <h1 className="text-2xl text-violet-950 font-bold ">Contents</h1>
            </div>
            <div>
              <div className="flex justify-center items-center">
                <p className="text-2xl text-violet-950 font-bold">
                  LEAVE A COMMENT
                </p>
              </div>
              <textarea
                name="text"
                // onChange={(e) => setText(e.target.value)}
                className="border-2 h-[10rem] outline-violet-950 flex items-start p-2 rounded-md mt-4"
                placeholder="Write your message here"
                type="text"
              />
              <div className=" flex justify-end mt-4">
                <button
                  // onClick={postBlogComments}
                  className="bg-violet-950 rounded-md font-semibold cursor-pointer hover:bg-violet-950700 p-2 w-fit text-white"
                >
                  <p>Send</p>
                </button>
              </div>
              <div>
                <p className="font-semibold text-xl">
                  {/* COMMENTS({blog.allComments?.length}) */}
                </p>
                {/* {blog?.allComments && (
                  <p className="font-semibold text-gray-400">
                    Be the first one to comment
                  </p>
                )} */}
                <p className="font-semibold text-gray-400">
                  Be the first one to comment
                </p>
              </div>
              {/* <div className="flex flex-col gap-4 mt-4">
                {blog ? (
                  blog.allComments
                    ?.slice(0, visibleComments)
                    .map((comments) => (
                      <div
                        className="shadow-md border rounded-lg p-6"
                        key={comments.comment_id}
                      >
                        <div className="flex gap-2">
                          <div className="w-12 h-12 rounded-full">
                            <img
                              alt="hehe"
                              className="w-full h-full object-cover rounded-full"
                              src={comments.user?.picture}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold text-violet-950">
                              {comments.user?.user_name}
                            </p>
                            <p className="text-sm font-semibold">
                              {comments.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div>
                    <p className="text-black">No comments</p>
                  </div>
                )}
              </div> */}
              {/* {blog.allComments?.length > 3 && (
                <div className="mt-4 flex justify-end">
                  {visibleComments === 3 ? (
                    <button
                      className="text-white font-semibold hover:bg-violet-950 cursor-pointer p-2 rounded-lg bg-violet-950"
                      onClick={showMoreComments}
                    >
                      <div className="flex items-center gap-2">
                        <p> See more comments</p>
                        <FiArrowDown />
                      </div>
                    </button>
                  ) : (
                    <button
                      className="text-white font-semibold hover:bg-violet-950 cursor-pointer p-2 rounded-lg bg-violet-950"
                      onClick={showLessComments}
                    >
                      <div className="flex items-center gap-2">
                        <p> See less comments</p>
                        <FiArrowUp />
                      </div>
                    </button>
                  )}
                </div>
              )} */}
            </div>
          </div>
          <div className="w-[40%] pl-6">
            <p className="text-2xl font-semibold mb-4">
              YOU MIGHT ALSO LIKE THESE
            </p>
            {/* <div className="grid grid-cols-1 gap-6 h-[60rem]  overflow-hidden overflow-y-auto scrollbar-none scroll-smooth">
              {shuffledBlogs ? (
                shuffledBlogs?.map((blog) => (
                  <Link to={`/blogs/${blog.blog_id}`} key={blog.index}>
                    <div className="flex flex-col border shadow-lg cursor-pointer transition-transform duration-300 transform-gpu hover:shadow-md hover:-translate-y-1">
                      <div className="h-[15rem] border">
                        <img
                          className="h-full w-full object-cover"
                          src={picture}
                          alt="blogPic"
                        />
                      </div>
                      <div className="flex flex-col pl-5 pr-5 pt-2 pb-8 h-[12rem]">
                        <p className="text-violet-950 font-semibold text-xl ">
                          {blogTag}
                        </p>
                        <div className="">
                          <p className="items-center font-bold text-xl line-clamp-3 tracking-wide uppercase">
                            {title}
                          </p>
                          <div className="text-neutral-500 font-semibold overflow-hidden line-clamp-2 text-xs  mt-3">
                            <p>
                              {content} dbibfbds fihsdf sdbfygds fsdyufg
                              dshbfyusd g dfds sdfg sudg disfsd fgdsyg fsd gfgyd
                              dshfgdsygfydsg
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div>
                  <p>eheh</p>
                </div>
              )}
            </div>{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
}
