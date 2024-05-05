import React, { useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteBlogs,
  tempDeleteBlogs,
} from "../../services/client/blogs.service";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import BlogHistoryModal from "./blogHistoryModal";
export default function BlogsSection({ blogs, getUserDetail }) {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownBlogId, setDropdownBlogId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false); // Step 1

  const handleDropdownToggle = (e, blogId) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
    setDropdownBlogId(blogId);
  };

  const deleteBlog = async () => {
    try {
      const res = await tempDeleteBlogs(dropdownBlogId);
      console.log(res.data);
      toast.success(res.data.message);
      getUserDetail();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDropdownBlogId(null);
  };

  const handleDeleteDialog = (blogId) => {
    setDropdownBlogId(blogId);
    setIsDialogOpen(true);
  };

  const handleViewHistory = (blogId) => {
    setDropdownBlogId(blogId);
    setIsHistoryDialogOpen(true);
  };
  console.log(blogs);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 text-sm">
        <div className="border-b-2 border-b-black w-fit font-semibold cursor-pointer">
          <p className="text-sm">Blogs posted by you</p>
        </div>
        <div className="flex gap-1 items-center">
          <p className="text-sm font-bold">
            {blogs != null ? blogs?.length : 0} Blogs
          </p>
        </div>
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {blogs?.map((blog) => (
              <div
                className="relative h-full overflow-hidden rounded-lg "
                key={blog.blogId}
              >
                <div
                  onClick={() => navigate(`/specific-blogs/${blog.blogId}`)}
                  //   onClick={() => handleRedirect(blog?.blog_id)}
                  className="hover:scale-105 duration-500 rounded-lg h-[15rem] cursor-pointer"
                >
                  <img
                    alt="nopehehe"
                    className=" h-full rounded-lg object-cover"
                    src={blog?.blogImage}
                  ></img>
                  <div className="absolute bottom-4 left-4 text-white ">
                    <p className="font-semibold line-clamp-2">{blog?.title}</p>
                    <p className="line-clamp-3 mt-2 mr-2 text-xs">
                      {blog?.content}
                    </p>
                  </div>
                </div>
                <div
                  onClick={(e) => handleDropdownToggle(e, blog?.blogId)}
                  className="absolute top-4 right-4 font-bold text-xl text-white cursor-pointer"
                >
                  <RxDotsHorizontal />
                </div>
                {showDropdown && dropdownBlogId === blog?.blogId && (
                  <div className="block absolute top-10 right-1 z-10 bg-white shadow-lg rounded-md">
                    <ul className="py-1">
                      <Link
                        to={`/edit-blogs/${dropdownBlogId}`}
                        className="px-4 py-2 text-sm text-gray-700  cursor-pointer"
                      >
                        Edit
                      </Link>
                      <li
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleDeleteDialog(blog?.blogId)}
                      >
                        Delete
                      </li>
                      <li
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleViewHistory(blog?.blogId)}
                      >
                        View History
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <Dialog
              open={isDialogOpen}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Delete Blog</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this blog? This action cannot
                  be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    deleteBlog(dropdownBlogId);
                    handleCloseDialog();
                  }}
                  color="secondary"
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={isHistoryDialogOpen}
              onClose={() => setIsHistoryDialogOpen(false)}
              aria-labelledby="history-dialog-title"
              aria-describedby="history-dialog-description"
            >
              <DialogTitle className="font-semibold">View History</DialogTitle>
              <DialogContent className="h-[30rem]">
                <DialogContentText id="history-dialog-description">
                  <BlogHistoryModal blog_id={dropdownBlogId} />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setIsHistoryDialogOpen(false)}
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <p className="text-black ">No blogs posted by you</p>
        )}
      </div>
    </div>
  );
}
