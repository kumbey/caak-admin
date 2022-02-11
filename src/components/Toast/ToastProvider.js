import { createContext, useCallback, useContext, useState } from "react";
import ToastContainer from "./ToastContainer";

const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ content, title, autoClose, time, type }) => {
      let toast = toasts;
      toast.push({
        content: content,
        title: title,
        autoClose: autoClose,
        time: time,
        type: type,
      });
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
  return useContext(ToastContext);
};

export { ToastContext, useToast };
export default ToastProvider;
