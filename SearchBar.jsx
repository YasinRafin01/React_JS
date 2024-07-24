import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <button className="search-btn">Anywhere</button>
      <button className="search-btn">Any week</button>
      <button className="search-btn">Add guests</button>
      <button className="search-icon-btn"><i className="fas fa-search"></i></button>
    </div>
  );
}

export default SearchBar;