import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../services/client/user.service";

import { toast } from "react-toastify";
import BlogsSection from "../../features/blogs/blogsSection";
import { Tabs, Tab, Dialog, Button, DialogActions } from "@mui/material";
import DeletedBlogsSection from "../../features/blogs/deletedBlogSection";
import { getLocalStorage } from "../../utils/localStorage";
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
  console.log(user);

  //!Chuttauna ko lai blogs either its temporarirly deleted or not
  const blogs = user?.blogs || [];
  const activeBlogs = blogs.filter((blog) => !blog.isDeleted);
  const deletedBlogs = blogs.filter((blog) => blog.isDeleted);

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
                {/* Joined in {formattedDate} */}
              </p>
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
        </div>
      </div>
    </div>
  );
}
