// adminDash.jsx
import React from "react";
import CumulativeStats from "../../components/adminComp/CumulativeStats";
import TopBlogPosts from "../../components/adminComp/TopBlogPosts";
import TopBloggers from "../../components/adminComp/TopBloggers";

const adminDash = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Blog Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CumulativeStats />
        <TopBlogPosts />
        <TopBloggers />
      </div>
    </div>
  );
};

export default adminDash;
