import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  postBlogVote,
  specificBlog,
} from "../../../services/client/blogs.service";
import { IoIosArrowForward } from "react-icons/io";
import { BiCalendar, BiUpvote } from "react-icons/bi";
import { FiArrowDown, FiArrowUp, FiTag } from "react-icons/fi";
import { BiSolidUpvote } from "react-icons/bi";
import CommentCard from "../../../components/blogs/comments/commentCard";
import { postBlogComments } from "../../../services/client/blog-comments.service";
import { toast } from "react-toastify";
import { BiSolidDownvote } from "react-icons/bi";
import { getLocalStorage } from "../../../utils/localStorage";

export default function BlogsMainPage() {
  const { blog_id } = useParams();
  const user_id = getLocalStorage().id;

  const [blog, setBlog] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [blogComments, setBlogComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(3);
  const [text, setText] = useState("");
  const [blogVotes, setBlogVotes] = useState([]);
  const navigate = useNavigate();

  const getBlogDetails = async () => {
    try {
      const res = await specificBlog(blog_id);
      console.log(res.data);
      setBlog(res.data.data.specificBlog);
      setSuggestions(res.data.data.blogSuggestions);
      setBlogComments(res.data.data.blogComments);
      setBlogVotes(res.data.data.blogVotes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [blog_id]);

  // Shuffle function to randomize the array order
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const showMoreComments = () => {
    setVisibleComments(blogComments.length);
  };

  const showLessComments = () => {
    setVisibleComments(3);
  };

  const postComments = async () => {
    if (user_id != null) {
      try {
        const res = await postBlogComments(text, blog_id);
        console.log(res);
        toast.success(res.data.message);
        setText("");
        getBlogDetails();
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    } else {
      toast.error("Login first to post the comments");
      navigate("/login");
    }
  };

  const postVote = async (vote) => {
    if (user_id != null) {
      try {
        const res = await postBlogVote(blog_id, vote);
        console.log(res);
        toast.success(res.data.message);
        setText("");
        getBlogDetails();
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    } else {
      toast.error("Login first to add reactions to the post");
      navigate("/login");
    }
  };

  // Select random 4 blogs from suggestions
  const randomFourBlogs = shuffleArray(suggestions).slice(0, 4);

  // Find user's vote for the current blog
  const userVote = blogVotes.find((vote) => vote.user.userId == user_id);

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
                <Link to={"/home"}>
                  <div
                    className=" hover:bg-gray-300 p-1 rounded-lg relative cursor-pointer"
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                  >
                    <p>Blogs</p>
                  </div>
                </Link>

                {/* {blog.blog_Tag?.tag_name} */}
              </div>
              <div className="flex items-center gap-2">
                <BiCalendar />
                Posted on:
                <p>{blog?.blogCreatedAt}</p>
                {/* {formatDate(blog?.createdAt)} */}
              </div>

              <div className="flex gap-4 items-center">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => postVote(true)}
                >
                  {/* <FaHeart
                  className={`${likedBlog ? "text-violet-950" : "text-white"} `}
                /> */}

                  <BiSolidUpvote
                    className={`${
                      userVote?.isVote ? "text-violet-950" : "text-white"
                    }`}
                  />
                  <p className="text-sm">{blog?.totalUpVote} upvotes</p>
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => postVote(false)}
                >
                  <BiSolidDownvote
                    className={`${
                      userVote?.isVote == false
                        ? "text-violet-950"
                        : "text-white"
                    }`}
                  />
                  <p className="text-sm">{blog?.totalDownVote} downvotes</p>
                </div>
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border-2 h-[10rem] outline-violet-950 flex items-start p-2 rounded-md mt-4 w-full"
                placeholder="Write your message here"
                type="text"
              />
              <div className=" flex justify-end mt-4">
                <button
                  onClick={postComments}
                  className="bg-violet-950 rounded-md font-semibold cursor-pointer hover:bg-violet-950700 p-2 w-fit text-white"
                >
                  <p>Send</p>
                </button>
              </div>
              <div>
                <p className="font-semibold text-xl">
                  COMMENTS( {blogComments?.length} )
                </p>
                {blogComments?.length < 0 && (
                  <p className="font-semibold text-gray-400">
                    Be the first one to comment
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {blogComments ? (
                  blogComments
                    ?.slice(0, visibleComments)
                    ?.map((comments) => (
                      <CommentCard
                        comment={comments}
                        getBlogDetails={getBlogDetails}
                      />
                    ))
                ) : (
                  <div>
                    <p className="text-black">No comments</p>
                  </div>
                )}
              </div>
              {blogComments?.length > 3 && (
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
              )}
            </div>
          </div>
          <div className="w-[40%] pl-6">
            <p className="text-2xl font-semibold mb-4">
              YOU MIGHT ALSO LIKE THESE
            </p>
            <div className="grid grid-cols-1 gap-6 ">
              {randomFourBlogs.map((blog) => (
                <Link to={`/specific-blogs/${blog.blogId}`} key={blog.blogId}>
                  {/* Render each blog item */}
                  <div className="flex flex-col border shadow-lg cursor-pointer transition-transform duration-300 transform-gpu hover:shadow-md hover:-translate-y-1">
                    <div className="h-[15rem] border">
                      <img
                        className="h-full w-full object-cover"
                        src={blog.blogImageUrl}
                        alt={blog.blogTitle}
                      />
                    </div>
                    <div className="flex flex-col pl-5 pr-5 pt-2 pb-8 h-[12rem]">
                      <p className="text-violet-950 font-semibold text-xl">
                        {blog.blogTag}
                      </p>
                      <div className="">
                        <p className="items-center font-bold text-xl line-clamp-3 tracking-wide uppercase">
                          {blog.blogTitle}
                        </p>
                        <div className="text-neutral-500 font-semibold overflow-hidden line-clamp-2 text-xs mt-3">
                          <p>{blog.blogContent}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
