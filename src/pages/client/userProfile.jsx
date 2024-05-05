import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUserDetails } from "../../services/client/user.service";

import { toast } from "react-toastify";
import BlogsSection from "../../features/blogs/blogsSection";
import { Tabs, Tab, Dialog, Button, DialogActions } from "@mui/material";
import DeletedBlogsSection from "../../features/blogs/deletedBlogSection";
import { clearLocalStorage, getLocalStorage } from "../../utils/localStorage";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const user_id = getLocalStorage().id;
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownBlogId, setDropdownBlogId] = useState(null);
  //   const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const getUserDetail = async () => {
    try {
      const res = await getUserDetails(user_id);
      console.log(res);
      setUser(res.data.data);
    } catch (e) {
      navigate(-1);
      console.log(e);
    }
  };
  console.log(dropdownBlogId);
  useEffect(() => {
    getUserDetail();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDeleteProfile = () => {
    setIsDialogOpen(true); // Open the dialog box
  };
  console.log(user);

  //!Chuttauna ko lai blogs either its temporarirly deleted or not
  const blogs = user?.blogs || [];
  const activeBlogs = blogs.filter((blog) => !blog.isDeleted);
  const deletedBlogs = blogs.filter((blog) => blog.isDeleted);

  const deleteUserProfile = async () => {
    try {
      const res = await deleteUser(user_id);
      console.log(res.data);
      toast.success(res.data.message);
      clearLocalStorage();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className=" flex justify-center items-center relative">
      <div className="p-4 flex flex-col gap-10 w-[80%] ">
        <div className="shadow-lg bg-gray-300 py-4 rounded-lg px-6 h-fit z-30">
          <div className="flex flex-col gap-3">
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
                {user.phone}
              </p>
              <p>
                <strong>Phone Number: </strong>
                {user.gender}
              </p>
              <div className="flex gap-2">
                <div className="text-sm font-semibold p-2 hover:bg-slate-200 duration-300 rounded-lg bg-slate-100 w-fit cursor-pointer border">
                  <p>Edit profile</p>
                </div>
                <Link
                  to={`/specific-user/${user_id}/updatePassword`}
                  className="text-sm font-semibold p-2 hover:bg-slate-200 duration-300 rounded-lg bg-slate-100 w-fit cursor-pointer border"
                >
                  <p>Edit password</p>
                </Link>
                <div
                  onClick={handleDeleteProfile}
                  className="text-sm font-semibold p-2 hover:bg-slate-200 duration-300 rounded-lg bg-slate-100 w-fit cursor-pointer border"
                >
                  <p>Delete profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs value={activeTab} onChange={handleTabChange} className="mb-10 ">
            <Tab label="Blogs" />
            <Tab label="Recent Deleted Blogs" />
          </Tabs>
          {activeTab === 0 && (
            <BlogsSection getUserDetail={getUserDetail} blogs={activeBlogs} />
          )}
          {activeTab === 1 && (
            <DeletedBlogsSection
              getUserDetail={getUserDetail}
              blogs={deletedBlogs}
            />
          )}

          {/* Dialog for confirming profile deletion */}
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <div className="p-4">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete your profile?</p>
            </div>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={deleteUserProfile}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
