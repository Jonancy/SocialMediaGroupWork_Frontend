import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import ScrollToTop from "../components/scrollTop/scrollTop";

export default function ClientLayout({ children }) {
  const user = "user";
  const navigate = useNavigate();

  if (user === "user") {
    return (
      <div>
        <ScrollToTop />

        <Navbar />
        {children}
      </div>
    );
  } else {
    navigate("*");
  }
}
