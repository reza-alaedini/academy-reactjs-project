import { toast } from "react-toastify";

export const success = (message) => {
  toast.success(message, {
    position: "top-right",
    theme: "colored",
    closeOnClick: true,
  });
};

export const error = (message) => {
  toast.error(message, {
    position: "top-right",
    theme: "colored",
    closeOnClick: true,
  });
};
