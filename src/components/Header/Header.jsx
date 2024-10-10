import "./Header.css";
function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__caption">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form action="" className="header__search-form">
          <div className="header__search-container">
            <input
              type="text"
              className="header__search-input"
              placeholder="Enter topic"
            />
            <button className="header__search-btn">Search</button>
          </div>
        </form>
      </div>
    </header>
  );
}

export default Header;
