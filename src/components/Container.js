import {useTheme} from "../context/ThemeContext";
import ToastProvider from "./Toast/ToastProvider";

const Container = ({children, ...props}) => {
    const {theme, menuStyle, overlay} = useTheme();

    return (
        <ToastProvider>
            <div
                {...props}
                className={`containerDiv ${theme} ${menuStyle} ${overlay ? "overlay active" : ""}`}
                style={{display: "flex"}}
            >
                {children}
            </div>
        </ToastProvider>
    );
};

export default Container;
