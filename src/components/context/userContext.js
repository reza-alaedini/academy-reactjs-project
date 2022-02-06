import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "./context";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { registerUser, loginUser } from "./../../services/userServices";
import { addUser } from "./../../Redux/Actions/user";
import { decode } from "./../../util/decode";
import { error, success } from "./../../util/message";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const UserContext = ({ children }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState();

  const [, forceUpdate] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی است.",
        min: "نام و نام خانوادگی نباید کمتر از 5 کاراکتر باشد.",
        email: "ایمیل نوشته شده صحیح نمی باشد.",
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );

  useEffect(() => {
    return () => {
      setFullname();
      setEmail();
      setPassword();
      setPolicy();
      forceUpdate();
    };
  }, []);

  // const resetStates = () => {
  //   setFullname("");
  //   setEmail("");
  //   setPassword("");
  //   setPolicy();
  // };

  const handleRegister = async (event) => {
    event.preventDefault();
    const user = {
      fullname, // --> fullname: fullname,
      email, // --> email: email,
      password, // --> password: password,
    };

    try {
      if (validator.current.allValid()) {
        dispatch(showLoading());
        const { status } = await registerUser(user);
        if (status === 201) {
          success("شخص با موفقیت اضافه شد !");
          dispatch(hideLoading());
          navigate("/login", { replace: true });
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      error("مشکلی پیش آمد !");
      dispatch(hideLoading());
      // console.log(ex);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      if (validator.current.allValid()) {
        dispatch(showLoading());
        const { status, data } = await loginUser(user);
        if (status === 200) {
          success("کاربر با موفقیت وارد شد !");
          localStorage.setItem("token", data.token);
          dispatch(addUser(decode(data.token).payload.user));
          dispatch(hideLoading());
          navigate("/", { replace: true });
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      error("مشکلی پیش آمد !");
      dispatch(hideLoading());
    }
  };

  return (
    <context.Provider
      value={{
        fullname,
        setFullname,
        email,
        setEmail,
        password,
        setPassword,
        policy,
        setPolicy,
        validator,
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default UserContext;
