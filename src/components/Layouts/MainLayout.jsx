import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

import TopNav from "../Navs/TopNav";
import Header from "../common/Header";
import MainNav from "../Navs/MainNav";
import Footer from "../common/Footer";
import { Helmet } from "react-helmet";

const MainLayout = (props) => {
  const location = useLocation();
  return (
    <div>
      <Helmet>
        <title>آکادمی مرجع تخصصی آموزش</title>
      </Helmet>

      <div className="landing-layer">
        <LoadingBar style={{ backgroundColor: "lime", height: "5px" }} />
        <div className="container">
          <TopNav />
          {location.pathname === "/" ? <Header /> : null}
        </div>
      </div>
      <div className="main-menu">
        <div className="container">
          <MainNav />
        </div>
      </div>
      <main id="home-page">
        {/* <div className="container">{props.children}</div> */}
        <div className="container"><Outlet /></div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
