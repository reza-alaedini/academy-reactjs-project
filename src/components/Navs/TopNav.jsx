import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const TopNav = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "lime" : "white",
                })}
              >
                صفحه اصلی
              </NavLink>
              <NavLink
                to="/about"
                style={({ isActive }) => ({
                  color: isActive ? "lime" : "white",
                })}
              >
                درباره ما
              </NavLink>
              <NavLink
                to="/contact"
                style={({ isActive }) => ({
                  color: isActive ? "lime" : "white",
                })}
              >
                تماس با ما
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 col-xs-12">
          <div className="clientarea">
            {!isEmpty(user) ? (
              <div className="loggein ">
                <i className="zmdi zmdi-account"></i>
                <NavLink to="/account"> {user.fullname} </NavLink>{" "}
                {user.isAdmin ? (
                  <NavLink to="/dashboard"> / پنل ادمین</NavLink>
                ) : null}
                / <NavLink to="/logout">خروج</NavLink>
              </div>
            ) : (
              <div className="signin">
                <i className="zmdi zmdi-account"></i>
                <NavLink
                  to="/login"
                  style={({ isActive }) => ({
                    color: isActive ? "lime" : "white",
                  })}
                >
                  {" "}
                  ورود{" "}
                </NavLink>{" "}
                /
                <NavLink
                  to="/register"
                  style={({ isActive }) => ({
                    color: isActive ? "lime" : "white",
                  })}
                >
                  {" "}
                  عضویت{" "}
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
