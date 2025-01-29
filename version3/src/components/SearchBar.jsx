
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Debounce Timer
  let debounceTimer;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    // Debounce search to prevent excessive parent calls
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onSearch(inputValue);
    }, 300); // Adjust delay as needed
  };

  return (
    <div
      className="search-container"
      style={{ margin: "20px auto", maxWidth: "700px", textAlign: "center" }}
    >
      <label htmlFor="search-bar" style={{ display: "none" }}>
        Search
      </label>
      <input
        id="search-bar"
        className="search-bar"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a country..."
        
      />
    </div>
  );
};

export default SearchBar;

