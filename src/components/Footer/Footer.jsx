import "./Footer.css";
import { Link } from "react-router-dom";
import Facebook from "../../assets/facebook.png";
import Github from "../../assets/github.png";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2024 Supersite, Powered by News API
        </p>
        <div className="footer__links">
          <div className="footer__links-container">
            <Link to="/" className="footer__link--home">
              Home
            </Link>
            <a
              href="https://tripleten.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link--tripleten"
            >
              TripleTen
            </a>
          </div>
          <div className="footer__social">
            <a
              href="https://github.com/mouachee"
              className="footer__social--github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Github} alt="" className="footer__social-icon" />
            </a>
            <a
              href="https://www.facebook.com/tripleten.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social--facebook"
            >
              <img src={Facebook} alt="" className="footer__social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
