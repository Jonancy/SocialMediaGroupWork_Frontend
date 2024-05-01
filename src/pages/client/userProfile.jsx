import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../services/client/user.service";
import { RxDotsHorizontal } from "react-icons/rx";
import { deleteBlogs } from "../../services/client/blogs.service";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const { user_id } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownBlogId, setDropdownBlogId] = useState(null);
  //   const [loading, setLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const getUserDetail = async () => {
    try {
      const res = await getUserDetails(user_id);
      console.log(res);
      setUser(res.data.data);
    } catch (e) {
      //   navigate(-1);
      console.log(e);
    }
  };
  console.log(dropdownBlogId);
  useEffect(() => {
    getUserDetail();
  }, []);

  const handleDropdownToggle = (e, blogId) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
    setDropdownBlogId(blogId);
  };

  const formattedDate = user.createdAt
    ? format(new Date(user.createdAt), "MMMM dd, yyyy")
    : "";

  const deleteBlog = async () => {
    try {
      const res = await deleteBlogs(dropdownBlogId, user_id);
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

  console.log(user);

  return (
    <div className=" flex justify-center items-center relative">
      <div className="p-4 flex flex-col gap-20 w-[80%] ">
        <div className="shadow-lg bg-gray-300 p-4 rounded-lg px-6  sticky top-28 h-fit z-30">
          <div className="flex flex-col gap-3">
            {/* <div className="flex justify-center items-center ">
                <div
                  className="w-[10rem] h-[10rem] rounded-full cursor-pointer hover:opacity-90"
                  onClick={viewUserImage}
                >
                  <img
                    className="w-full h-full  rounded-full object-cover"
                    src={user.profile_picture}
                    alt="Profile"
                  />
                </div>
              </div> */}
            <div className=" flex flex-col gap-3 text-sm">
              <p>
                <strong>Name: </strong>
                {user.userName}
              </p>
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
              <p>
                <strong>Phone Number: </strong>
                {user.phone_number}
              </p>
            </div>
            <div className=" font-semibold">
              <p>
                {user.user_name} - {user.roles}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-2 ">
                Joined in {formattedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 text-sm">
            <div className="border-b-2 border-b-black w-fit font-semibold cursor-pointer">
              <p className="text-sm">Blogs posted by you</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-sm font-bold">
                {user?.blogs != null ? user?.blogs?.length : 0} Blogs
              </p>
            </div>
            {user?.blogs && user?.blogs.length > 0 ? (
              <div className="grid grid-cols-4 gap-6">
                {user?.blogs?.map((blog) => (
                  <div
                    className="relative h-full overflow-hidden rounded-lg "
                    key={blog.blog_id}
                  >
                    <div
                      //   onClick={() => handleRedirect(blog?.blog_id)}
                      className="hover:scale-105 duration-500 rounded-lg h-full cursor-pointer"
                    >
                      <img
                        alt="nopehehe"
                        className=" h-full rounded-lg object-cover"
                        src={blog?.blogImage}
                      ></img>
                      <div className="absolute bottom-4 left-4 text-white ">
                        <p className="font-semibold ">{blog?.title}</p>
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
                      <div className="block absolute top-10 right-4 z-10 bg-white shadow-lg rounded-md">
                        <ul className="py-1">
                          <Link
                            to={`/edit-blogs/${dropdownBlogId}`}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleEdit(blog?.blogId)}
                          >
                            Edit
                          </Link>
                          <li
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleDeleteDialog(blog?.blogId)}
                          >
                            Delete
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
                      Are you sure you want to delete this blog? This action
                      cannot be undone.
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
              </div>
            ) : (
              <p className="text-black ">No blogs posted by you</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
