import React, { Fragment } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { gregorian_to_jalali } from "./../../util/jalali";

const Account = () => {
  const dateNow = new Date();
  const JDate = gregorian_to_jalali(
    dateNow.getFullYear(),
    dateNow.getMonth() + 1,
    dateNow.getDate()
  );

  const user = useSelector((state) => state.user);

  if (isEmpty(user)) return <Navigate to="/" replace />; // Protecting the "Route"
  return (
    <Fragment>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/">آکادمی</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {" "}
              پنل کاربری{" "}
            </li>
          </ul>
        </nav>
      </div>

      <main>
        <div className="container">
          <div className="user-account">
            <div className="row">
              <div className="col-md-3 col-sm-4 col-xs-12">
                <aside>
                  <div className="avatar-layer">
                    <div className="img-layer">
                      <a href="##" className="change-image">
                        <i className="zmdi zmdi-edit"></i>
                      </a>
                      <img src="images/pic/avatar.jpg" alt="" />
                    </div>
                    <div className="detail">
                      <span> {user.fullname} </span>
                      <span>{` عضویت : ${JDate[0]}/${JDate[1]}/${JDate[2]}`}</span>
                    </div>
                  </div>

                  <section>
                    <header>
                      <h3> میز کار </h3>
                    </header>
                    <div className="inner">
                      <ul>
                        <li>
                          <NavLink to="/account"> مشاهده حساب کابری </NavLink>
                        </li>
                        <li>
                          <NavLink to="/editAccount">
                            {" "}
                            ویرایش حساب کابری{" "}
                          </NavLink>
                        </li>
                        {/* <li>
                          <a href="##"> تغییر رمز عبور </a>
                        </li>
                        <li>
                          <a href="##"> تنظیمات حساب کاربری </a>
                        </li> */}
                        <li>
                          <Link to="/logout"> خروج از حساب کاربری </Link>
                        </li>
                      </ul>
                    </div>
                  </section>
                </aside>
              </div>
              <div className="col-md-9 col-sm-8 col-xs-12">
                <section className="user-account-content">
                  <header>
                    <h1> داشبورد </h1>
                  </header>
                  <div className="inner">
                    <div className="account-information">
                      <h3> اطلاعات کاربری </h3>
                      <ul>
                        <li>
                          {" "}
                          <i className="zmdi zmdi-account"></i> نام و نام
                          خانوادگی : {user.fullname}{" "}
                        </li>
                        <li>
                          {" "}
                          <i className="zmdi zmdi-assignment-account"></i> نام
                          کاربری : rezaalaedini{" "}
                        </li>
                        <li>
                          {" "}
                          <i className="zmdi zmdi-email"></i> ایمیل :
                          {user.email}
                        </li>
                        <li>
                          {" "}
                          <i className="zmdi zmdi-calendar-check"></i> 
                          {`تاریخ عضویت : ${JDate[0]}/${JDate[1]}/${JDate[2]}`}
                        </li>
                        <li>
                          {" "}
                          <i className="zmdi zmdi-smartphone-android"></i> شماره
                          تماس : 0910000000{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Account;
