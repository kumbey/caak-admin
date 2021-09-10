import React from "react";
import {
  hideMenuDetail,
  hideOverlay,
  showActivePage,
  showOverlay,
} from "../assets/js/menu";

export default function MenuBar({ menuBarRef, menuItemsRef }) {
  const mType = "menu-icons-only";
  // const menuType = localStorage.getItem("menuType");
  React.useEffect(() => {
    showActivePage();
    if (mType) {
      document.documentElement.classList.add(mType);
    }
    document.addEventListener("click", (event) => {
      if (
        !event.target.closest(".menu-items a") &&
        !event.target.closest(".menu-detail") &&
        !menuBarRef.current.classList.contains("menu-wide")
      ) {
        hideMenuDetail(menuBarRef);
      }
    });
  }, [menuBarRef]);

  const subMenuOpen = (e) => {
    const menuLink = e.target.closest(".link");
    const menu = menuLink.dataset.target;
    const selectedMenu = menuBarRef.current.querySelector(menu);
    if (!menuBarRef.current.classList.contains("menu-wide")) {
      if (selectedMenu) {
        showOverlay(true);
        selectedMenu.classList.add("open");
      } else {
        hideOverlay();
      }

      hideMenuDetail(menuBarRef);

      if (selectedMenu) {
        showOverlay(true);
        selectedMenu.classList.add("open");
      } else {
        hideOverlay();
      }
    }
  };
  return (
    <aside
      ref={menuBarRef}
      className={`menu-bar menu-sticky menu-hidden ${mType ? mType : ""}`}
    >
      <div
        ref={menuItemsRef}
        className="menu-items"
        onClick={(e) => {
          subMenuOpen(e);
        }}
      >
        <div className="menu-header hidden">
          <a href="#1" className="flex items-center mx-8 mt-8">
            <span className="avatar w-16 h-16">JD</span>
            <div className="ml-4 text-left text-gray-700 dark:text-gray-500">
              <h5>John Doe</h5>
              <p className="mt-2">Editor</p>
            </div>
          </a>
          <hr className="mx-8 my-4" />
        </div>
        <a
          href="/"
          className="link"
          data-toggle="tooltip-menu"
          data-tippy-content="Dashboard"
        >
          <span className="icon la la-laptop" />
          <span className="title">Dashboard</span>
        </a>
        <a
          href="#nsda"
          className="link"
          data-target="[data-menu=pages]"
          data-toggle="tooltip-menu"
          data-tippy-content="Pages"
        >
          <span className="icon la la-file-alt" />
          <span className="title">Pages</span>
        </a>
        <a
          href="#no-link"
          className="link"
          data-target="[data-menu=applications]"
          data-toggle="tooltip-menu"
          data-tippy-content="Applications"
        >
          <span className="icon la la-store" />
          <span className="title">Applications</span>
        </a>
        <a
          href="#no-link"
          className="link"
          data-target="[data-menu=ui]"
          data-toggle="tooltip-menu"
          data-tippy-content="UI"
        >
          <span className="icon la la-cube" />
          <span className="title">UI</span>
        </a>
        <a
          href="#no-link"
          className="link"
          data-target="[data-menu=menu]"
          data-toggle="tooltip-menu"
          data-tippy-content="Menu"
        >
          <span className="icon la la-sitemap" />
          <span className="title">Menu</span>
        </a>
        <a
          href="blank.html"
          className="link"
          data-toggle="tooltip-menu"
          data-tippy-content="Blank Page"
        >
          <span className="icon la la-file" />
          <span className="title">Blank Page</span>
        </a>
        <a
          href="https://yetiadmin.yetithemes.net/docs"
          target="blank"
          className="link"
          data-toggle="tooltip-menu"
          data-tippy-content="Docs"
        >
          <span className="icon la la-book-open" />
          <span className="title">Docs</span>
        </a>
      </div>

      <div className="menu-detail" data-menu="dashboard">
        <div className="menu-detail-wrapper">
          <a href="index.html">
            <span className="la la-cube" />
            Default
          </a>
          <a href="index.html">
            <span className="la la-file-alt" />
            Content
          </a>
          <a href="index.html">
            <span className="la la-shopping-bag" />
            Ecommerce
          </a>
        </div>
      </div>

      <div className="menu-detail" data-menu="pages">
        <div className="menu-detail-wrapper">
          <h6 className="uppercase">Authentication</h6>
          <a href="auth-login.html">
            <span className="la la-user" />
            Login
          </a>
          <a href="auth-forgot-password.html">
            <span className="la la-user-lock" />
            Forgot Password
          </a>
          <a href="auth-register.html">
            <span className="la la-user-plus" />
            Register
          </a>
          <hr />
          <h6 className="uppercase">Blog</h6>
          <a href="blog-list.html">
            <span className="la la-list" />
            List
          </a>
          <a href="blog-list-card-rows.html">
            <span className="la la-list" />
            List - Card Rows
          </a>
          <a href="blog-list-card-columns.html">
            <span className="la la-list" />
            List - Card Columns
          </a>
          <a href="blog-add.html">
            <span className="la la-layer-group" />
            Add Post
          </a>
          <hr />
          <h6 className="uppercase">Errors</h6>
          <a href="errors-403.html" target="_blank">
            <span className="la la-exclamation-circle" />
            403 Error
          </a>
          <a href="errors-404.html" target="_blank">
            <span className="la la-exclamation-circle" />
            404 Error
          </a>
          <a href="errors-500.html" target="_blank">
            <span className="la la-exclamation-circle" />
            500 Error
          </a>
          <a href="errors-under-maintenance.html" target="_blank">
            <span className="la la-exclamation-circle" />
            Under Maintenance
          </a>
          <hr />
          <a href="pages-pricing.html">
            <span className="la la-dollar" />
            Pricing
          </a>
          <a href="pages-faqs-layout-1.html">
            <span className="la la-question-circle" />
            FAQs - Layout 1
          </a>
          <a href="pages-faqs-layout-2.html">
            <span className="la la-question-circle" />
            FAQs - Layout 2
          </a>
          <a href="pages-invoice.html">
            <span className="la la-file-invoice-dollar" />
            Invoice
          </a>
        </div>
      </div>

      <div className="menu-detail" data-menu="applications">
        <div className="menu-detail-wrapper">
          <a href="applications-media-library.html">
            <span className="la la-image" />
            Media Library
          </a>
          <a href="applications-point-of-sale.html">
            <span className="la la-shopping-bag" />
            Point Of Sale
          </a>
          <a href="applications-to-do.html">
            <span className="la la-check-circle" />
            To Do
          </a>
          <a href="applications-chat.html">
            <span className="la la-comment" />
            Chat
          </a>
        </div>
      </div>

      <div className="menu-detail" data-menu="ui">
        <div className="menu-detail-wrapper">
          <h6 className="uppercase">Form</h6>
          <a href="form-components.html">
            <span className="la la-cubes" />
            Components
          </a>
          <a href="form-input-groups.html">
            <span className="la la-stop" />
            Input Groups
          </a>
          <a href="form-layout.html">
            <span className="la la-th-large" />
            Layout
          </a>
          <a href="form-validations.html">
            <span className="la la-check-circle" />
            Validations
          </a>
          <a href="form-wizards.html">
            <span className="la la-hand-pointer" />
            Wizards
          </a>
          <hr />
          <h6 className="uppercase">Components</h6>
          <a href="components-alerts.html">
            <span className="la la-bell" />
            Alerts
          </a>
          <a href="components-avatars.html">
            <span className="la la-user-circle" />
            Avatars
          </a>
          <a href="components-badges.html">
            <span className="la la-certificate" />
            Badges
          </a>
          <a href="components-buttons.html">
            <span className="la la-play" />
            Buttons
          </a>
          <a href="components-cards.html">
            <span className="la la-layer-group" />
            Cards
          </a>
          <a href="components-collapse.html">
            <span className="la la-arrow-circle-right" />
            Collapse
          </a>
          <a href="components-dropdowns.html">
            <span className="la la-arrow-circle-down" />
            Dropdowns
          </a>
          <a href="components-modal.html">
            <span className="la la-times-circle" />
            Modal
          </a>
          <a href="components-popovers-tooltips.html">
            <span className="la la-thumbtack" />
            Popovers & Tooltips
          </a>
          <a href="components-tabs.html">
            <span className="la la-columns" />
            Tabs
          </a>
          <a href="components-tables.html">
            <span className="la la-table" />
            Tables
          </a>
          <a href="components-toasts.html">
            <span className="la la-bell" />
            Toasts
          </a>
          <hr />
          <h6 className="uppercase">Extras</h6>
          <a href="extras-carousel.html">
            <span className="la la-images" />
            Carousel
          </a>
          <a href="extras-charts.html">
            <span className="la la-chart-area" />
            Charts
          </a>
          <a href="extras-editors.html">
            <span className="la la-keyboard" />
            Editors
          </a>
          <a href="extras-sortable.html">
            <span className="la la-sort" />
            Sortable
          </a>
        </div>
      </div>

      <div className="menu-detail" data-menu="menu">
        <div className="menu-detail-wrapper">
          <a href="#no-link">
            <span className="la la-cube" />
            Default
          </a>
          <a href="#no-link">
            <span className="la la-file-alt" />
            Content
          </a>
          <a href="#no-link">
            <span className="la la-shopping-bag" />
            Ecommerce
          </a>
          <hr />
          <a href="#no-link">
            <span className="la la-layer-group" />
            Main Level
          </a>
          <a href="#no-link">
            <span className="la la-arrow-circle-right" />
            Grand Parent
          </a>
          <a
            href="#no-link"
            className="active"
            data-toggle="collapse"
            data-target="#menuGrandParentOpen"
          >
            <span className="collapse-indicator la la-arrow-circle-down" />
            Grand Parent Open
          </a>
          <div id="menuGrandParentOpen" className="collapse open">
            <a href="#no-link">
              <span className="la la-layer-group" />
              Sub Level
            </a>
            <a href="#no-link">
              <span className="la la-arrow-circle-right" />
              Parent
            </a>
            <a
              href="#no-link"
              className="active"
              data-toggle="collapse"
              data-target="#menuParentOpen"
            >
              <span className="collapse-indicator la la-arrow-circle-down" />
              Parent Open
            </a>
            <div id="menuParentOpen" className="collapse open">
              <a href="#no-link">
                <span className="la la-layer-group" />
                Sub Level
              </a>
            </div>
          </div>
          <hr />
          <h6 className="uppercase">Menu Types</h6>
          <a href="#no-link" data-toggle="menu-type" data-value="default">
            <span className="la la-hand-point-right" />
            Default
          </a>
          <a href="#no-link" data-toggle="menu-type" data-value="hidden">
            <span className="la la-hand-point-left" />
            Hidden
          </a>
          <a href="#no-link" data-toggle="menu-type" data-value="icon-only">
            <span className="la la-th-large" />
            Icons Only
          </a>
          <a href="#no-link" data-toggle="menu-type" data-value="wide">
            <span className="la la-arrows-alt-h" />
            Wide
          </a>
        </div>
      </div>
    </aside>
  );
}
