import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

export default function ClientLayout({ children }) {
  const user = "user";
  const navigate = useNavigate();

  if (user === "user") {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  } else {
    navigate("*");
  }
}
