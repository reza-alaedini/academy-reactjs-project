import React, { useContext } from "react";
import { dashContext } from "../context/dashContext";
import Pagination from "../Course/Pagination";

const CourseTable = () => {
  const context = useContext(dashContext);

  const {
    currentPage,
    perPage,
    handleChangePage,
    courseData,
    openNewCourseDialog,
    openEditCourseDialog,
    openDeleteCourseDialog,
    filteredCourses,
    setSearch,
    sortCoursesAsc,
    sortCoursesDesc,
  } = context;

  return (
    <section style={{ padding: "1em 2em", marginTop: "60px" }}>
      <div>
        <div className="alert alert-info text-center">لیست دوره ها</div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="btn btn-primary" onClick={openNewCourseDialog}>
            <span className="fa fa-plus"></span> اضافه کردن دوره جدید
          </button>
          <input
            className="form-control"
            placeholder="جستجوی دوره"
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "40em" }}
          />
        </div>

        <div>
          <table className="table" style={{ marginTop: "2em" }}>
            <thead>
              <tr>
                <th>عنوان دوره</th>
                <th>تصویر دوره</th>
                <th>
                  قیمت دوره (تومان)
                  <span
                    className="fa fa-long-arrow-up"
                    style={{ margin: "0.5em", cursor: "pointer" }}
                    onClick={sortCoursesDesc}
                    title="مرتب سازی نزولی"
                  ></span>
                  <span
                    className="fa fa-long-arrow-down"
                    style={{ margin: "0.5em", cursor: "pointer" }}
                    onClick={sortCoursesAsc}
                    title="مرتب سازی صعودی"
                  ></span>
                </th>

                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>

            <tbody>
              {courseData.map((course) => (
                <tr>
                  <td>{course.title}</td>
                  <td>
                    <a
                      href={`https://toplearnapi.ghorbany.dev/${course.imageUrl}`}
                      target="_blank"
                      className="btn btn-info"
                      rel="noreferrer"
                    >
                      تصویر دوره
                    </a>
                  </td>
                  <td>{course.price === 0 ? "رایگانــــ" : course.price}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => openEditCourseDialog(course)}
                    >
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteCourseDialog(course)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="navbar-fixed-bottom"
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "15em",
          }}
        >
          <Pagination
            totalCourses={filteredCourses.length}
            currentPage={currentPage}
            perPage={perPage}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseTable;
