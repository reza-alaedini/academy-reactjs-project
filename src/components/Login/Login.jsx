import React, { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { NavLink,Navigate } from "react-router-dom";

import { context } from "./../context/context";
import { useSelector } from "react-redux";
import { isEmpty } from 'lodash';

const Login = () => {
  const user = useSelector((state) => state.user);
  const loginContext = useContext(context);
  const { email, setEmail, password, setPassword, validator, handleLogin } =
    loginContext;

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
              ورود به سایت
            </li>
          </ul>
        </nav>
      </div>

      <main className="client-page">
        <div className="container-content">
          <header>
            <h2> ورود به سایت </h2>
          </header>

          <Helmet>
            <title>آکادمی | ورود به سایت</title>
          </Helmet>

          <div className="form-layer">
            <form onSubmit={(e) => handleLogin(e)}>
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
                    validator.current.showMessages("email");
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
                {validator.current.message(
                  "password",
                  password,
                  "required|min:5"
                )}
              </div>

              <div className="remember-me">
                <label>
                  <input type="checkbox" name="" /> مرا بخاطر بسپار{" "}
                </label>
              </div>

              <div className="link">
                <a href="##">
                  {" "}
                  <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده
                  ام !
                </a>
                <NavLink to="/register">
                  {" "}
                  <i className="zmdi zmdi-account"></i> عضویت در سایت{" "}
                </NavLink>
              </div>

              <button className="btn btn-success"> ورود به سایت </button>
            </form>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Login;
