import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const notify = {
    success: (message, options = {}) => {
      toast.success(message, options);
    },
    error: (message, options = {}) => {
      toast.error(message, options);
    },
    info: (message, options = {}) => {
      toast.info(message, options);
    },
    warning: (message, options = {}) => {
      toast.warning(message, options);
    },
    custom: (message, options = {}) => {
      toast(message, options);
    },
  };

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ToastContext.Provider>
  );
};
