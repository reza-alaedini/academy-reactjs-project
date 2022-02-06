import React, { useEffect, useRef, useState } from "react";
import { dashContext } from "./dashContext";
import { paginate } from "./../../util/paginate";
import NewCourseDialog from "./../admin/dialogs/newCourseDialog";
import EditCourseDialog from "../admin/dialogs/EditDialog";
import DeleteCourseDialog from "../admin/dialogs/DeleteCourseDialog";
import { orderBy } from "lodash";
import SimpleReactValidator from "simple-react-validator";

const AdminContext = ({ children, courses }) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage] = useState(5);

  const [currentCourse, setCurrentCourse] = useState({});
  const [newCourseDialog, setNewCourseDialog] = useState(false);
  const [editCourseDialog, setEditCourseDialog] = useState(false);
  const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);

  const [search, setSearch] = useState("");
  const [coursesList, setCoursesList] = useState([]);

  const openNewCourseDialog = () => setNewCourseDialog(true);
  const closeNewCourseDialog = () => setNewCourseDialog(false);

  useEffect(() => setCoursesList(courses), [courses]);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی است.",
        min: "نام دوره نباید کمتر از 5 کاراکتر باشد.",
        email: "ایمیل نوشته شده صحیح نمی باشد.",
        integer: "وارد کردن حروف مورد قبول نیست",
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );

  const openEditCourseDialog = (course) => {
    setEditCourseDialog(true);
    setCurrentCourse(course);
  };
  const closeEditCourseDialog = () => setEditCourseDialog(false);

  const openDeleteCourseDialog = (course) => {
    setDeleteCourseDialog(true);
    setCurrentCourse(course);
  };

  const closeDeleteCourseDialog = () => {
    setDeleteCourseDialog(false);
  };

  const handleChangePage = (page) => {
    setcurrentPage(page);
  };

  const filteredCourses = coursesList.filter((course) =>
    course.title.includes(search)
  );

  const courseData = paginate(filteredCourses, currentPage, perPage);

  const sortCoursesAsc = () => {
    setCoursesList(orderBy(coursesList, "price", "asc"));
  };

  const sortCoursesDesc = () => {
    setCoursesList(orderBy(coursesList, "price", "desc"));
  };

  return (
    <dashContext.Provider
      value={{
        currentPage,
        perPage,
        handleChangePage,
        courseData,
        openNewCourseDialog,
        openEditCourseDialog,
        openDeleteCourseDialog,
        setSearch,
        filteredCourses,
        sortCoursesAsc,
        sortCoursesDesc,
        validator,
      }}
    >
      <NewCourseDialog
        showDialog={newCourseDialog}
        closeDiaolg={closeNewCourseDialog}
      />
      <EditCourseDialog
        showDialog={editCourseDialog}
        closeDialog={closeEditCourseDialog}
        course={currentCourse}
      />
      <DeleteCourseDialog
        showDialog={deleteCourseDialog}
        closeDialog={closeDeleteCourseDialog}
        course={currentCourse}
      />
      {children}
    </dashContext.Provider>
  );
};

export default AdminContext;
