import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearch, searchText, setSearchText, isFilterEnabled, setFilterEnabled, handleCheckboxChange}) {
  const [isValid, setIsValid] = React.useState(false);
  const formRef = React.useRef();
  const submitButtonRef = React.useRef();
  const searchInput = React.useRef();

  React.useEffect(() => {
    if (formRef.current.checkValidity()) {
      setIsValid(true);
      submitButtonRef.current.disabled = false;
    } else {
      setIsValid(false);
      submitButtonRef.current.disabled = true;
    }
  }, [searchText]);

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultText = searchText.trim();
    if (resultText.length > 0) {
      onSearch(resultText, isFilterEnabled);
    }
  };

  return (
    <section className="search-form section">
      <form
        className="search-form__form"
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
      >
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
          className={`search-form__submit ${
            isValid ? "search-form__submit_active" : ""
          }`}
          type="submit"
          value="Найти"
        />
        <FilterCheckbox
          isFilterEnabled={isFilterEnabled}
          setIsFilterEnabled={setFilterEnabled}
          onFilterCheckboxChange={handleCheckboxChange}
        />
      </form>
    </section>
  );
}

export default SearchForm;
