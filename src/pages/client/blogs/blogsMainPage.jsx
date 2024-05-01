import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { specificBlog } from "../../../services/client/blogs.service";

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
      <main>
        <article>
          <header className="mx-auto max-w-screen-xl pt-20 text-center">
            <p className="text-gray-500">Published April 4, 2022</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
              {blog?.blogTitle}
            </h1>
            <p className="mt-6 text-lg text-gray-700">
              You're doing marketing the wrong way
            </p>
            <div
              className="mt-6 flex flex-wrap justify-center gap-2"
              aria-label="Tags"
            >
              <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
                Marketing
              </button>
              <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
                Branding
              </button>
              <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
                Digital
              </button>
              <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">
                Identity
              </button>
            </div>
            <img
              className="sm:h-[34rem] mt-10 w-full object-contain"
              src={blog?.blogImageUrl}
              alt="Featured Image"
            />
          </header>

          <div className="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
            <strong className="text-2xl font-medium">
              {blog?.blogContent}
            </strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              enim maxime sit laudantium! Dolore atque, maxime iusto ut quas
              distinctio reiciendis animi voluptatibus soluta molestias,
              mollitia officiis laboriosam illum earum.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              similique reiciendis et recusandae provident repellendus rem
              doloremque eaque error assumenda?
            </p>
          </div>
        </article>
      </main>

      <div className="w-fit mx-auto mt-10 flex space-x-2">
        <div className="h-0.5 w-2 bg-gray-600"></div>
        <div className="h-0.5 w-32 bg-gray-600"></div>
        <div className="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <aside
        aria-label="Related Articles"
        className="mx-auto mt-10 max-w-screen-xl py-20"
      >
        <h2 className="mb-8 text-center text-5xl font-bold text-gray-900">
          More Blogs
        </h2>

        <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
          {suggestions?.map((blog) => (
            <Link
              to={`/specific-blogs/${blog.blogId}`}
              key={blog.blogId}
              className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg"
            >
              <a href="#">
                <img
                  src={blog?.blogImageUrl}
                  className="h-56 w-full object-cover"
                  alt=""
                />
                <div className="flex-auto px-6 py-5">
                  <span className="mb-2 flex items-center text-sm font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                    Branding
                  </span>
                  <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                    {blog?.blogTitle}
                  </h3>
                  <p className="mb-4 text-base font-light">
                    {blog?.blogContent}
                  </p>
                  <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                    Read Now
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
