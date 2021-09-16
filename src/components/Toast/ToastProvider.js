import React, { useState, useContext, useCallback } from "react";
import ToastContainer from "./ToastContainer";

const ToastContext = React.createContext(null);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (content) => {
      let toast = toasts;
      toast.push({ content: content });
      setToasts([...toast]);
    },
    [setToasts, toasts]
  );

  const removeToast = useCallback(
    (id) => {
      let removingToasts = toasts;
      removingToasts[id].removing = true;
      setToasts(removingToasts);

      setTimeout(function () {
        removingToasts.splice(id, 1);
        setToasts([...removingToasts]);
      }, 200);
    },
    [setToasts, toasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
