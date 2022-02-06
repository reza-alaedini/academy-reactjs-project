import { createContext } from "react";

export const dashContext = createContext({
  currentPage: 1,
  setCurrentPage: () => {},
  page: 5,
  handleChangePage: () => {},
  currentCourse: {},
  setSearch: () => {},
  openNewCourseDialog: () => {},
  openEditCourseDialog: () => {},
  openDeleteCourseDialog: () => {},
  courseData: [],
  filteredCourses: [],
  sortCoursesAsc: () => {},
  sortCoursesDesc: () => {},
  validator: null,
});
