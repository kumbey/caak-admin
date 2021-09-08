// Toggle Menu
export const toggleMenu = (menuBar) => {
    if (menuBar.current.classList.contains("menu-hidden")) {
        document.documentElement.classList.remove("menu-hidden");
        menuBar.current.classList.remove("menu-hidden");
    } else {
        document.documentElement.classList.add("menu-hidden");
        menuBar.current.classList.add("menu-hidden");
    }
};

export const showOverlay = (workspace) => {
    if (document.querySelector(".overlay")) return;

    document.body.classList.add("overlay-show");

    const overlay = document.createElement("div");
    if (workspace) {
        overlay.setAttribute("class", "overlay workspace");
    } else {
        overlay.setAttribute("class", "overlay");
    }

    document.body.appendChild(overlay);
    overlay.classList.add("active");
};


// Hide
export const hideOverlay = () => {
    const overlayToRemove = document.querySelector(".overlay");

    if (!overlayToRemove) return;

    document.body.classList.remove("overlay-show");

    overlayToRemove.classList.remove("active");
    document.body.removeChild(overlayToRemove);
};

// Hide Menu Detail
export const hideMenuDetail = (menuBarRef) => {
    menuBarRef.current.querySelectorAll(".menu-detail.open").forEach((menuDetail) => {
        hideOverlay();

        if (!menuBarRef.current.classList.contains("menu-wide")) {
            menuDetail.classList.remove("open");
        }
    });
};

export const showActivePage = () => {
    const pageUrl = window.location.href.split(/[?#]/)[0];

    const pageLinkSelector = ".menu-bar a";

    const pageLinks = document.querySelectorAll(pageLinkSelector);

    if (!pageLinks) return;

    pageLinks.forEach((pageLink) => {
        if (pageLink.href === pageUrl) {
            pageLink.classList.add("active");

            const mainMenuTrigger = pageLink.closest(".menu-detail");

            if (!mainMenuTrigger) return;

            const mainMenu = document.querySelector(
                '.menu-items .link[data-target="[data-menu=' +
                mainMenuTrigger.dataset.menu +
                ']"]'
            );

            mainMenu.classList.add("active");
        }
    });
};
