import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBlog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/admin">
        <FontAwesomeIcon icon={faHome} />
        <span>Dashboard</span>
      </Link>
      <Link to="/admin/bloggers">
        <FontAwesomeIcon icon={faUser} />
        <span>Bloggers</span>
      </Link>
      <Link to="/admin/blogs">
        <FontAwesomeIcon icon={faBlog} />
        <span>Blogs</span>
      </Link>
      <Link to="/">
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Logout</span>
      </Link>
    </div>
  );
}
