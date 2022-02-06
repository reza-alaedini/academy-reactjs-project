import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Helmet from "react-helmet";
import AdminTopNav from "../admin/AdminTopNav";
import AdminSidebar from "../admin/AdminSidebar";
import { LoadingBar } from "react-redux-loading-bar";

const PrivateLayout = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <div id="wrapper">
      <Helmet>
        <title>آکادمی | داشبورد</title>
      </Helmet>
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <LoadingBar
          style={{ backgroundColor: "lime", height: "5px", zIndex: "1" }}
        />
        <div className="navbar-header">
          <Link className="navbar-brand" to="/dashboard">
            داشبورد آکادمی
          </Link>
        </div>

        <AdminTopNav user={user} />

        <AdminSidebar />
      </nav>
      {/* <div id="page-wrapper">{children}</div> */}
      <div id="page-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
