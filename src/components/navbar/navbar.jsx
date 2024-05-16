import { useEffect, useRef, useState } from "react";
import { clearLocalStorage, getLocalStorage } from "../../utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import NotificationCard from "../notification/notificationCard";
import {
  getAllNotifications,
  getUnreadNotiCounts,
  readUserNoti,
} from "../../services/client/user.service";

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const user = getLocalStorage().id;
  const [openDialog, setOpenDialog] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotiCounts, setUnreadNotiCounts] = useState(0);
  const navigate = useNavigate();

  console.log(user);
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    getUserUnreadNotification();
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);

  const getUserNotifications = async () => {
    try {
      const res = await getAllNotifications(user);
      console.log(res.data);
      setNotifications(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserUnreadNotification = async () => {
    try {
      const res = await getUnreadNotiCounts(user);
      console.log(res.data);
      setUnreadNotiCounts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  function logOut() {
    clearLocalStorage();
    setIsUserMenuOpen(false);
    window.location.reload();
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const readNoti = async () => {
    try {
      const res = await readUserNoti(user);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
    getUserNotifications();
    readNoti();
    getUserUnreadNotification();
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start ">
            <div className="flex space-x-4">
              <Link
                to="/home"
                className="  hover:text-gray-600 duration-300 rounded-md px-3 py-2 text-sm font-medium text-white cursor-pointer "
              >
                Home
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user && (
              <>
                <button
                  type="button"
                  onClick={handleOpenDialog}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <div className="relative">
                    <svg
                      className="w-5 h-5 text-black-600 animate-wiggle"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 21 21"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
                      />
                    </svg>
                    <div className=" py[2px] bg-red-500 rounded-full text-center text-white text-[10px] absolute -top-3 -end-3 px-[5px]">
                      {unreadNotiCounts > 0 && unreadNotiCounts}
                      <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-red-200 w-full h-full"></div>
                    </div>
                  </div>
                </button>
                <Dialog
                  maxWidth="lg"
                  open={openDialog}
                  onClose={handleCloseDialog}
                >
                  <DialogTitle>Notification</DialogTitle>
                  <DialogContent>
                    <div className="flex flex-col gap-2">
                      {notifications?.map((noti) => (
                        <NotificationCard noti={noti} />
                      ))}
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                  </DialogActions>
                </Dialog>
              </>
            )}

            {user > 0 ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    onClick={toggleUserMenu}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                    ref={userMenuRef}
                  >
                    <Link
                      to={`/specific-user/${user}`}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to={"/post-blogs"}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Post blogs
                    </Link>

                    <button
                      type="button"
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 "
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={logOut}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    onClick={toggleUserMenu}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                    ref={userMenuRef}
                  >
                    <Link
                      to={"/register"}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Sign in
                    </Link>
                    <Link
                      to={"/login"}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      //   onClick={logOut}
                    >
                      Log in
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
}
