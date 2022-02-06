import React, { useEffect, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import MainLayout from "../components/Layouts/MainLayout";
import Course from "../components/Course/Course";
import Login from "../components/Login/Login";
import Register from "../components/register/register";
import Archive from "../components/Course/Archive";
import Account from "../components/Account/Account";
import EditAccount from "../components/Account/Edit_Account";
import SingleCourse from "../components/Course/SingleCourse";
import { paginate } from "./../util/paginate";
import { addUser, deleteUser } from "./../Redux/Actions/user";
import { decode } from "../util/decode";
import Logout from "./../components/Login/Logout";
import UserContext from "../components/context/userContext";
import NotFound from "./../components/common/404";
import PrivateLayout from "../components/Layouts/PrivateLayout";
import Dashboard from "../components/admin/Dashboard";
import CourseTable from "./../components/admin/CourseTable";
import AdminContext from "../components/context/AdminContext";

const Academy = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodeToken = decode(token);
      const dateNow = Date.now() / 1000; // convert unixTime to  milisecond

      if (decodeToken.payload.exp < dateNow) {
        localStorage.removeItem("token");
        dispatch(deleteUser());
      } else dispatch(addUser(decodeToken.payload.user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);
  const indexCourses = paginate(courses, 1, 8);
  return (
    <Fragment>
      {/* <MainLayout> */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/login"
            element={
              <UserContext>
                <Login />
              </UserContext>
            }
          />
          <Route
            path="/register"
            element={
              <UserContext>
                <Register />
              </UserContext>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/account" element={<Account />} />
          <Route path="/editAccount" element={<EditAccount />} />
          <Route path="/course/:id" element={<SingleCourse />} />
          <Route
            path="/"
            element={
              indexCourses.length > 0 ? (
                <Course courses={indexCourses} />
              ) : (
                <h2 style={{ textAlign: "center", margin: "2em" }}>
                  هیچ دوره ایی جهت نمایش موجود نیست !
                </h2>
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            !isEmpty(user) && user.isAdmin ? (
              <PrivateLayout />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route path="/dashboard" element={<Dashboard courses={courses} />} />
          <Route
            path="/dashboard/courses"
            element={
              !isEmpty(user) && user.isAdmin ? (
                <AdminContext courses={courses}>
                  <CourseTable />
                </AdminContext>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
      </Routes>
      {/* </MainLayout> */}
    </Fragment>
  );
};

export default Academy;
