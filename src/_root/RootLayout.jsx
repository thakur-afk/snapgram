/* eslint-disable no-unused-vars */
import React from "react";
import Topbar from "../component/shared/Topbar";
import LeftSidebar from "../component/shared/LeftSidebar";
import { Outlet } from "react-router-dom";
import Bottombar from "../component/shared/Bottombar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
