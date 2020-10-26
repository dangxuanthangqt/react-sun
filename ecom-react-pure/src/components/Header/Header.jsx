import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Header.scss";
Header.propTypes = {};

function Header(props) {
  const { handleChangeSearchFilter } = props;
  const [valueSearch, setValueSearch] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setValueSearch(value);
    handleChangeSearchFilter(value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    handleChangeSearchFilter(valueSearch);
  };
  return (
    <header className="header">
      <a href="#">
        <img
          className="header__logo"
          src="https://community.algolia.com/instantsearch.js/v1/examples/e-commerce/logo-is.png"
          alt=""
        />
      </a>
      <h1 className="header__desc">Amazing</h1>
      <form className="header__form-search">
        <div>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search a product "
          />
          <button onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </header>
  );
}

export default Header;
