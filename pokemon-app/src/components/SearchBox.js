import React from "react";

const SearchBox = ({ handleSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      onChange={handleSearchChange}
      className="search-box"
    />
  );
};

export default SearchBox;
