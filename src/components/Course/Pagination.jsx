import React from "react";
import { range } from "lodash";

const Pagination = ({ totalCourses, currentPage, perPage, onChangePage }) => {
  const pageCount = Math.ceil(totalCourses / perPage);
  if (pageCount === 1) return null;
  const pages = range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {pages.map((page) => (
          <li
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <span
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => onChangePage(page)}
            >
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
