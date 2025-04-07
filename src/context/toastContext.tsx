import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ToastNotify } from "../interfaces";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext<ToastNotify | undefined>(undefined);

export const useToast = (): ToastNotify => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const notify: ToastNotify = {
    success: (message, options = {}) => toast.success(message, options),
    error: (message, options = {}) => toast.error(message, options),
    info: (message, options = {}) => toast.info(message, options),
    warning: (message, options = {}) => toast.warning(message, options),
    custom: (message, options = {}) => toast(message, options),
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
