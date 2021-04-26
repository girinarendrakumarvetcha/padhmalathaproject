import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = props => {
  return toast[props.type](props.message, {
    position: toast.POSITION.TOP_CENTER,
    closeButton: true,
    hideProgressBar: true
  });
};
