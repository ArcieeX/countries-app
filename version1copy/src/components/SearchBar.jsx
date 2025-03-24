import { useState } from 'react';

import PropTypes from 'prop-types'
// import data from '../data.json';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass the input value to the parent
  };

  return (
    <div className="search-container" style={{ margin: '20px auto', maxWidth: '700px', textAlign: 'center' }}>
      <input
      className='search-bar'
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
    </div>
  );
};
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;

