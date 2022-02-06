import React, { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { NavLink, Navigate } from "react-router-dom";

import { context } from "./../context/context";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const Register = () => {
  const user = useSelector((state) => state.user);
  const registerContext = useContext(context);
  const {
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    policy,
    setPolicy,
    validator,
    handleRegister,
  } = registerContext;

  if (!isEmpty(user)) return <Navigate to="/" />;
  return (
    <Fragment>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/">آکادمی</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              عضویت در سایت
            </li>
          </ul>
        </nav>
      </div>

      <main className="client-page">
        <div className="container-content">
          <header>
            <h2> عضویت در سایت </h2>
          </header>

          <Helmet>
            <title>آکادمی | ثبت نام در سایت</title>
          </Helmet>

          <div className="form-layer">
            <form onSubmit={handleRegister}>
              <div className="input-group">
                <span className="input-group-addon" id="username">
                  <i className="zmdi zmdi-account"></i>
                </span>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  placeholder="نام و نام خانوادگی"
                  aria-describedby="username"
                  value={fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                    validator.current.showMessageFor("fullname");
                  }}
                />
                {validator.current.message(
                  "fullname",
                  fullname,
                  "required|min:5"
                )}
              </div>

              <div className="input-group">
                <span className="input-group-addon" id="email-address">
                  <i className="zmdi zmdi-email"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="ایمیل"
                  aria-describedby="email-address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validator.current.showMessageFor("email");
                  }}
                />
                {validator.current.message("email", email, "required|email")}
              </div>

              <div className="input-group">
                <span className="input-group-addon" id="password">
                  <i className="zmdi zmdi-lock"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="رمز عبور "
                  aria-describedby="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validator.current.showMessageFor("password");
                  }}
                />
                {validator.current.message("password", password, "required|")}
              </div>

              <div className="accept-rules">
                <label>
                  <input
                    type="checkbox"
                    name="policy"
                    onChange={(e) => {
                      setPolicy(e.currentTarget.checked);
                      validator.current.showMessageFor("policy");
                    }}
                  />
                  قوانین و مقررات سایت را میپذیرم{" "}
                  {validator.current.message("policy", policy, "required")}
                </label>
              </div>

              <div className="link">
                <a href="##">
                  {" "}
                  <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت
                  !
                </a>
                <NavLink to="/login">
                  {" "}
                  <i className="zmdi zmdi-account"></i> ورود به سایت{" "}
                </NavLink>
              </div>

              <button className="btn btn-success"> عضویت در سایت </button>
            </form>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Register;
