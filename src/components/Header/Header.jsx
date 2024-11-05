import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";
function Header({ onSearch, setSearchTerm }) {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">What&apos;s going on in the world?</h1>
        <p className="header__caption">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearch={onSearch} setSearchTerm={setSearchTerm} />
      </div>
    </header>
  );
}

export default Header;
