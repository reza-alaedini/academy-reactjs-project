import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <div className="container text-center container404">
        <h1 className="number404">404</h1>
        <h3 className="text404">شرمنده هیچ صفحه ایی با این نشانی پیدا نشد!!</h3>
        <NavLink to="/">
          <p className="homeLink">رفتن به صفحه نخست <span className="arrow404" /></p>
        </NavLink>
      </div>
    </Fragment>
  );
};

export default NotFound;
