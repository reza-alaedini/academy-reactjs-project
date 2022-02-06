import { DialogContent, DialogOverlay } from "@reach/dialog";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleUpdateCourse } from "./../../../Redux/Actions/courses";

const EditCourseDialog = ({ closeDialog, showDialog, course }) => {
  const [courseId, setCourseId] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [info, setInfo] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setCourseId(course._id);
    setTitle(course.title);
    setPrice(course.price);
    setImageUrl(course.imageUrl);
    setInfo(course.info);

    return () => {
      setCourseId();
      setTitle();
      setPrice();
      setImageUrl();
      setInfo();
    };
  }, [course]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append("title", title);
    data.append("price", price);
    if (event.target.imageUrl.files[0])
      data.append("imageUrl", event.target.imageUrl.files[0]);
    else data.append("imageUrl", imageUrl);
    data.append("info", info);

    dispatch(handleUpdateCourse(courseId, data));
    closeDialog();
  };

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
        <div className="inner form-layer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              aria-describedby="title"
              placeholder="عنوان دوره"
              className="form-control"
              style={{ marginBottom: 3 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              name="price"
              aria-describedby="price"
              placeholder="قیمت دوره"
              className="form-control"
              style={{ marginBottom: 3 }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="file"
              name="imageUrl"
              aria-describedby="imageUrl"
              className="form-control"
              style={{ marginBottom: 3 }}
            />

            <textarea
              name="info"
              cols="30"
              rows="10"
              placeholder="توضیحات دوره"
              className="form-control"
              style={{ marginBottom: 3 }}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-success"
              style={{ margin: "1em" }}
            >
              ويرايش دوره
            </button>

            <button
              className="btn btn-warning mr-5"
              style={{ margin: "1em" }}
              onClick={closeDialog}
            >
              انصراف
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default EditCourseDialog;
