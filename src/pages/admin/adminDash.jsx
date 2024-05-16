// adminDash.jsx
import React, { useState } from "react";
import CumulativeStats from "../../components/adminComp/CumulativeStats";
import TopBlogPosts from "../../components/adminComp/TopBlogPosts";
import TopBloggers from "../../components/adminComp/TopBloggers";
import SideBar from "../../components/adminComp/SideBar";
import CreateAdmin from "../../components/adminComp/CreateAdmin";

const adminDash = () => {
  const [currentView, setCurrentView] = useState("clients");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <SideBar onViewChange={handleViewChange} />

      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b-4">
          <div>
            <h1 className="text-xl font-semibold mt-10"></h1>
          </div>
        </header>

        <main className="h-full overflow-y-auto">
          {currentView === "clients" && <CumulativeStats />}
          {currentView === "addClients" && <TopBlogPosts />}
          {currentView === "services" && <TopBloggers />}
          {currentView === "addServices" && <CreateAdmin />}
        </main>
      </div>
    </div>
  );
};

export default adminDash;
