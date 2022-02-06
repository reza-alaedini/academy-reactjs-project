import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  deleteCourse,
  getAllCourses,
  newCourse,
  updateCourse,
} from "./../../services/courseService";
import { success } from "./../../util/message";

export const getCourses = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    const { data } = await getAllCourses();
    await dispatch({ type: "INIT", payload: data.courses });
    dispatch(hideLoading());
  };
};

export const createNewCourse = (course) => {
  return async (dispatch, getState) => {
    const { data, status } = await newCourse(course);
    await dispatch({
      type: "ADD_COURSE",
      payload: [...getState().courses, data.course],
    });
    if (status === 201) {
      success("دوره با موفقیت اضافه شد !");
    }
  };
};

export const handleUpdateCourse = (courseId, updatedCourse) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const filteredCourses = courses.filter((course) => course._id !== courseId);

    // const updatedCourses = [...courses];
    // const courseIndex = updatedCourses.findIndex(
    //   (course) => course._id === courseId
    // );

    // let course = updatedCourses[courseIndex];
    // course = { ...Object.fromEntries(updatedCourse) };

    // updatedCourses[courseIndex] = course;

    try {
      const { data, status } = await updateCourse(updatedCourse, courseId);
      await dispatch({
        type: "UPDATE_COURSE",
        payload: [data.course, ...filteredCourses],
      });
      if (status === 200) {
        success("دوره با موفقيت ويرايش شد !");
      }
    } catch (ex) {
      await dispatch({ type: "UPDATE_COURSE", payload: [...courses] });
    }
  };
};

export const handleDeleteCourse = (courseId) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const filteredCourses = courses.filter((course) => course._id !== courseId);

    try {
      await dispatch({ type: "DELETE_COURSE", payload: [...filteredCourses] });
      const { status } = await deleteCourse(courseId);
      if (status === 200) success("دوره با موفقیت حذف شد !");
    } catch (ex) {
      await dispatch({ type: "DELETE_COURSE", payload: [...courses] });
    }
  };
};
