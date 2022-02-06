import { useContext, useState } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useDispatch } from "react-redux";
import { error } from "../../../util/message";
import { createNewCourse } from "../../../Redux/Actions/courses";
import { dashContext } from "../../context/dashContext";

const NewCourseDialog = ({ showDialog, closeDiaolg }) => {
  const context = useContext(dashContext);

  const { validator } = context;

  const [, forceUpdate] = useState(0);
  const [imageUrl, setImageUrl] = useState();

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [info, setInfo] = useState();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (validator.current.allValid()) {
        let data = new FormData();
        data.append("title", title);
        data.append("price", price);
        data.append("imageUrl", event.target.imageUrl.files[0]);
        data.append("info", info);

        //Dispatch
        dispatch(createNewCourse(data));
        closeDiaolg();
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      console.log(ex);
      error(ex);
    }
  };

  return (
    <DialogOverlay
      isOpen={showDialog}
      onDismiss={closeDiaolg}
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
              onChange={(e) => {
                setTitle(e.target.value);
                validator.current.showMessages("title");
              }}
            />
            {validator.current.message("title", title, "required|min:5")}

            <input
              type="text"
              name="price"
              aria-describedby="price"
              placeholder="قیمت دوره"
              className="form-control"
              style={{ marginBottom: 3 }}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                validator.current.showMessages("price");
              }}
            />
            {validator.current.message("price", price, "required|integer")}

            <input
              type="file"
              name="imageUrl"
              aria-describedby="imageUrl"
              className="form-control"
              style={{ marginBottom: 3 }}
              onChange={() => {
                setImageUrl(1);
                validator.current.showMessages("imageUrl");
              }}
            />
            {validator.current.message("imageUrl", imageUrl, "required")}

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
              ثبت دوره
            </button>

            <button
              className="btn btn-warning mr-5"
              style={{ margin: "1em" }}
              onClick={closeDiaolg}
            >
              انصراف
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default NewCourseDialog;
