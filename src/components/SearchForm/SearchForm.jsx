import { useState } from "react";

function SearchForm({ setSearchTerm, onSearch }) {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      setErrorMessage("Please enter a keyword");
    } else {
      setErrorMessage("");

      if (trimmedInput) {
        setSearchTerm(trimmedInput);
        onSearch(trimmedInput);
      }
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };
  return (
    <form className="header__search-form" onSubmit={handleSubmit}>
      <div className="header__search-container">
        {errorMessage && <p className="header__search-error">{errorMessage}</p>}
        <input
          type="text"
          className="header__search-input"
          placeholder="Enter topic"
          value={input}
          onChange={handleChange}
        />
        <button className="header__search-btn">Search</button>
      </div>
    </form>
  );
}
export default SearchForm;
