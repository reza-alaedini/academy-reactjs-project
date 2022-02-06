import _ from "lodash";

export const paginate = (courses, currentPage, perPage) => {
  const courseIndex = (currentPage - 1) * perPage;
  return _(courses).slice(courseIndex).take(perPage).value();
};
