import { useTheme } from "../context/ThemeContext"


const Container = ({children, ...props}) => {

    const {theme, menuStyle} = useTheme()

    return(
        <div {...props} className={`${theme} ${menuStyle}`}>
            {children}
        </div>
    )
}

export default Container