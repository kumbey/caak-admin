const toggleDarkMode = () => {
    const enableDarkMode = () => {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        localStorage.setItem("scheme", "dark");
    };

// Disable Dark Mode
    const disableDarkMode = () => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.removeItem("scheme");
    };

// Check Dark Mode
    const checkDarkMode = () => {
        return document.documentElement.classList.contains("dark");
    };
    return checkDarkMode() ? disableDarkMode() : enableDarkMode()
}
export default toggleDarkMode;
