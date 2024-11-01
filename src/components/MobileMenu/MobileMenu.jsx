import "./MobileMenu.css";
import { Link } from "react-router-dom";
function MobileMenu({ isOpen, onClose, isLoggedIn, onLogOut, onSignInClick }) {
  if (!isOpen) return null;
  return (
    <div className="mobile-menu">
      <div className="mobile-menu__container">
        <ul className="mobile-menu__nav-list">
          <li className="mobile-menu__item">
            <Link className="mobile-menu__logo" to="/" onClick={onClose}>
              NewsExplorer
            </Link>
          </li>
          <li className="mobile-menu__item">
            <button className="mobile-menu__button" onClick={onClose}></button>
          </li>
        </ul>
        <div className="mobile-menu__container-content">
          <Link className="mobile-menu__home" to="/">
            <span className="mobile-menu__text-home" onClick={onClose}>
              {" "}
              Home
            </span>
          </Link>
          <button className="mobile-menu__signin">Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
