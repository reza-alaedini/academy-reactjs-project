import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./../Reducers/reducers";
import { getCourses } from "./../Actions/courses";
import { loadingBarMiddleware } from "react-redux-loading-bar";

// const reduxDevTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(
  reducers,
  compose(applyMiddleware(thunk, loadingBarMiddleware()))
);

//initialize Courses
store.dispatch(getCourses());

//subscribe
// store.subscribe(() => console.log(store.getState()));
