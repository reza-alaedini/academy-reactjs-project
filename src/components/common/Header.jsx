import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header>
        <NavLink to="/" className="logo">
          <img src="images/logo.png" alt="" />
        </NavLink>
        <h1> با اساتید مجرب و کارآزموده در آکادمی تخصصی</h1>
        <h2> آموزش ببینید ، تجربه کسب کنید وارد بازار کار شوید </h2>
        <h3> با کمترین هزینه خودت یاد بگیر </h3>
      </header>
      <div className="search-form">
        <form>
          <input type="text" name="" placeholder="چی میخوای یاد بگیری ؟" />
          <button>
            <i className="zmdi zmdi-search"></i>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Header;
