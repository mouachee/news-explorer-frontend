import { useState } from "react";

function SearchForm({ setSearchTerm, onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      setSearchTerm(trimmedInput);
      onSearch(trimmedInput);
    }
  };
  return (
    <form className="header__search-form" onSubmit={handleSubmit}>
      <div className="header__search-container">
        <input
          type="text"
          className="header__search-input"
          placeholder="Enter topic"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="header__search-btn">Search</button>
      </div>
    </form>
  );
}
export default SearchForm;
