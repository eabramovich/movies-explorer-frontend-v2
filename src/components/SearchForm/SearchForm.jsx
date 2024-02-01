import React from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm({ onSearch, searchText, setSearchText }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation();
  const [isChecked, setIsChecked] = React.useState(false);
  // const [searchText, setSearchText] = React.useState('');
  console.log(isChecked);
  const submitButtonRef = React.useRef();
  const searchInput = React.useRef();
  const location = useLocation();

  React.useEffect(() => {
    console.log(searchText);
    if(searchText) {
      submitButtonRef.current.disabled = false;
    } else {
      submitButtonRef.current.disabled = true;
    }
    console.log(submitButtonRef.current.disabled);
  }, [location, searchText]);

  const onSearchTextChange = (e) => {
    setSearchText(searchInput.current.value);
    handleChange(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(values.text.trim().length > 0) {
      onSearch(values.text);
    }
  };

  return (
    <section className="search-form section">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <input
          required
          ref={searchInput}
          className="search-form__input"
          name="text"
          placeholder="Фильм"
          value={searchText}
          onChange={onSearchTextChange}
          type="search"
        />
        <input
          ref={submitButtonRef}
          className={`search-form__submit ${isValid ? "search-form__submit_active" : ""}`}
          type="submit"
          value="Найти"
        />
        <FilterCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </form>
    </section>
  );
}

export default SearchForm;
