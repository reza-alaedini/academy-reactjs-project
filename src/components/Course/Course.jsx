import React from "react";
import { NavLink } from "react-router-dom";
import ShowImage from "../common/ShowImage";

const Course = ({ courses, imgHeight = 210 }) => {
  return (
    <section className="terms-items">
      <header>
        <h2> آخرین دوره های آکادمی</h2>
        <NavLink to="/archive"> مشاهده همه دوره ها </NavLink>
      </header>
      <div className="row">
        {courses.map((course) => (
          <div
            key={course._id}
            className="col-lg-3 col-md-4 col-sm-6 col-xs-12 term-col"
          >
            <article>
              <NavLink to={`/course/${course._id}`} className="img-layer">
                {/* <img
                  src={`https://toplearnapi.ghorbany.dev/${course.imageUrl}`}
                  style={{ height: "200px" }}
                  alt=""
                /> */}
                <ShowImage image={course.imageUrl} height={imgHeight} />
              </NavLink>
              <h2>
                <NavLink to={`/course/${course._id}`}>{course.title}</NavLink>
              </h2>
              <span>
                {course.price === 0
                  ? "رایگانــــــــ"
                  : `${course.price} تومان`}
              </span>
              {/* <span>رایگان</span> */}
              <i>1:52:32</i>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Course;
