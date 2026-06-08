import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar cursos"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="search-button">🔍</button>
      </div>
    </div>
  );
}

export default SearchBar;
