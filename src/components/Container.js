import { useTheme } from "../context/ThemeContext"


const Container = ({children, ...props}) => {

    const {theme, menu} = useTheme()

    return(
        <div {...props} className={theme +" "+ menu}>
            {children}
        </div>
    )
}

export default Container