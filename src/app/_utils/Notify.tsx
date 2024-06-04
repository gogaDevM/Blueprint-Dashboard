import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const success = (message: string = "Success") => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    closeButton: false,
    pauseOnFocusLoss: false,
  });
};

const error = (message: string = "Error") => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    closeButton: false,
    pauseOnFocusLoss: false,
  });
};

const Notify = {
  success,
  error,
};

export default Notify;
