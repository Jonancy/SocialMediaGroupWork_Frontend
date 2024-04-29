import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const user = "user";
  const navigate = useNavigate();

  if (user === "admin") {
    return <div>{children}</div>;
  } else {
    navigate("*");
  }
}
