import React from 'react';
// Css
import './searchaBarre.scss';
// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// Import propTypes
import PropTypes from 'prop-types';
const SearchBarre = ({ setSearch }) => {
  return (
    <>
      <label className="search-barre" htmlFor="search">
        <input
          name="search"
          placeholder="recherche par identifiant"
          className="input-search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"></input>
      </label>
      <i className="icon-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </i>
    </>
  );
};

SearchBarre.propTypes = {
  setSearch: PropTypes.func
};

export default SearchBarre;
