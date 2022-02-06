import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Academy from "./Academy";

const App = () => {
  useEffect(() => {
    require("../util/script");
  }, []);
  return (
    <BrowserRouter>
      <Academy />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
