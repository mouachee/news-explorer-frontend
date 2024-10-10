import "./Nav.css";
import LogoutIcon from "../../assets/logout.png";
import { useState } from "react";

function Nav() {
  const [activeItem, setActiveItem] = useState("home");
  return (
    <nav className="nav">
      <div className="nav__container">
        <p className="nav__item nav__item--logo">NewsExplorer</p>
        <p
          className={`nav__item nav__item--home ${
            activeItem === "home" ? "nav__item--active" : ""
          }`}
        >
          Home
        </p>
        <p
          className={`nav__item nav__item--saved ${
            activeItem === "saved" ? "nav__item--active" : ""
          }`}
        >
          Saved articles
        </p>
        <button className="nav__logout">
          <span className="nav__username">Elise</span>
          <img src={LogoutIcon} alt="logout icon" className="logout__icon" />
        </button>
      </div>
    </nav>
  );
}
export default Nav;
