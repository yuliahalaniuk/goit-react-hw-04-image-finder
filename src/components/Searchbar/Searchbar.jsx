import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      alert('Please enter you request');
      return;
    }

    onSubmit(searchQuery);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className={css.searchbarWrapper}>
      <form className={css.formWrap} onSubmit={handleSearchSubmit}>
        <button type="submit" className={css.searchBtn}>
          <CiSearch className={css.searchIcon} />
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.searchInput}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
