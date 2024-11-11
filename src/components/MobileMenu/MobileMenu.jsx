import "./MobileMenu.css";
import { Link } from "react-router-dom";
function MobileMenu({
  isOpen,
  onClose,
  isLoggedIn,
  onLogOut,
  onSignInClick,
  logoutIcon,
  isHomePage,
}) {
  if (!isOpen) return null;
  return (
    <div className="mobile-menu">
      <div className="mobile-menu__overlay" onClick={onClose}></div>
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
          <span className="mobile-menu__text">
            <Link
              className="mobile-menu__link-text"
              onClick={onClose}
              to={isHomePage && isLoggedIn ? "/saved-news" : "/"}
            >
              {isHomePage && isLoggedIn ? "Saved articles" : "Home"}
            </Link>
          </span>
          {isLoggedIn ? (
            <button
              className="mobile-menu__logout"
              onClick={() => {
                onLogOut();
                onClose();
              }}
            >
              <span className="moble-menu__username">Elise</span>
              <img
                src={logoutIcon}
                alt="Mobile logout icon"
                className="mobile-menu__logout-icon"
              />
            </button>
          ) : (
            <button
              className="mobile-menu__signin"
              onClick={() => {
                onSignInClick();
                onClose();
              }}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
