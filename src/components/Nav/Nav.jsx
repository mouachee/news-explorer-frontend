import "./Nav.css";
import HomeLogoutIcon from "../../assets/wLogout.svg";
import SaveNewsLogoutIcon from "../../assets/bLogout.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const [activeItem, setActiveItem] = useState("home");
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isSavedNewsPage = location.pathname === "/saved-news";

  useEffect(() => {
    if (isHomePage) {
      setActiveItem("home");
    } else if (isSavedNewsPage) {
      setActiveItem("saved");
    }
  }, [location.pathname, isHomePage, isSavedNewsPage]);
  return (
    <nav className="nav">
      <div
        className={`nav__container ${
          activeItem === "saved" ? "nav__container--black-text" : ""
        }`}
      >
        <ul className="nav__list">
          <li className="nav__item nav__item--logo">
            <Link to="/" className="nav__link">
              NewsExplorer
            </Link>
          </li>
          <li
            className={`nav__item nav__item--home ${
              isSavedNewsPage ? "nav__item-home--hover" : ""
            }`}
          >
            <Link
              to="/"
              className={`nav__link ${
                activeItem === "home" ? "nav__item--active" : ""
              }`}
            >
              Home
            </Link>
          </li>

          <li
            className={`nav__item nav__item--saved ${
              isHomePage ? "nav__item-saved--hover" : ""
            }`}
          >
            <Link
              to="/saved-news"
              className={`nav__link ${
                activeItem === "saved" ? "nav__item--active" : ""
              }`}
            >
              Saved articles
            </Link>
          </li>
          <li className="nav__item nav__item--logout">
            <button className="nav__logout">
              <span className="nav__username">Elise</span>
              <img
                src={
                  activeItem == "saved" ? SaveNewsLogoutIcon : HomeLogoutIcon
                }
                alt="logout icon"
                className="logout__icon"
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Nav;
