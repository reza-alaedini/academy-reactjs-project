import React from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { handleDeleteCourse } from "../../../Redux/Actions/courses";
import { useDispatch } from "react-redux";

const DeleteCourseDialog = ({ showDialog, closeDialog, course }) => {
  const dispatch = useDispatch();
  return (
    <DialogOverlay
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ background: "hsla(0,100%,100%,0.9)" }}
    >
      <DialogContent
        style={{
          border: "solid 5px hsla(0,0%,0%,0.5)",
          borderRadius: "10px",
          boxShadow: "0px 10px 50px hsla(0,0%,0%,0.33)",
        }}
      >
        <div className="text-center">
          <h4>حذف دوره {course.title}</h4>
          <hr />
          <p>آیا از حذف دوره {course.title} اطمینان دارید؟</p>
        </div>
        <div>
          <button
            className="btn btn-danger pad2"
            style={{ margin: "1em" }}
            onClick={() =>
              dispatch(handleDeleteCourse(course._id)) && closeDialog()
            }
          >
            مطمئن هستم
          </button>
          <button
            className="btn btn-warning pad2"
            style={{ margin: "1em" }}
            onClick={closeDialog}
          >
            انصراف
          </button>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default DeleteCourseDialog;
