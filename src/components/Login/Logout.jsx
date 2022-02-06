import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../Redux/Actions/user";
import { useNavigate, Navigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(deleteUser());
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isEmpty(user)) return <Navigate to="/" />;  // Protecting the "Route"
  return null;
};

export default Logout;
