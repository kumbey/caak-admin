import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import ReactDOM from "react-dom";

const ConfirmAlert = ({
  onSubmit,
  show,
  onClose,
  side,
  title,
  setIsShowConfirmAlert,
  ...props
}) => {
  const { setOverlay } = useTheme();
  useEffect(() => {
    show ? setOverlay(true) : setOverlay(false);
    // eslint-disable-next-line
  }, [show]);

  return ReactDOM.createPortal(
    <div
      className={`py-8  modal  ${
        show
          ? side
            ? "active animate__animated animate__faster animate__fadeInRight"
            : "active animate__animated animate__faster animate__fadeInDown"
          : ""
      }`}
      {...props}
    >
      <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center items-center h-full">
        <div className="relative w-auto bg-white dark:bg-gray-800 shadow rounded">
          <div className="flex flex-col items-center pt-8 pb-6 px-7 sm:px-14">
            <p className="text-sm leading-5 text-center  text-gray-600 dark:text-gray-300">
              {title}
            </p>
          </div>
          <div className="flex items-center justify-center py-3  dark:bg-gray-700 rounded-bl rounded-br">
            <button
              onClick={onSubmit}
              className="text-xs sm:text-sm font-medium leading-none text-indigo-700 focus:outline-none px-3 sm:px-5 py-3 bg-indigo-100 hover:bg-indigo-200 dark:hover:bg-indigo-100 dark:bg-indigo-200 border rounded"
            >
              Тийм
            </button>
            <button
              onClick={onClose}
              className="text-xs sm:text-sm font-medium leading-none text-gray-700 px-3 sm:px-5 py-3 bg-indigo-700 dark:bg-indigo-600 hover:bg-opacity-80 ml-3 focus:outline-none rounded"
            >
              Үгүй
            </button>
          </div>
          <div
            onClick={onClose}
            className="cursor-pointer absolute top-0 right-0 m-3 text-gray-800 dark:text-gray-100 transition duration-150 ease-in-out"
          >
            X
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default ConfirmAlert;
