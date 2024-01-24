import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form section">
      <form className="search-form__form">
        <input className="search-form__input" name="s" placeholder="Фильм" type="search" />
        <input className="search-form__submit" type="submit" value="Найти" />
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
