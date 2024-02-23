import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { message } from "../../utils/constants";

function SearchForm({ onSearch, searchText, setSearchText, isFilterEnabled, setFilterEnabled, handleCheckboxChange}) {
  //const [isValid, setIsValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const formRef = React.useRef();
  const submitButtonRef = React.useRef();
  const searchInput = React.useRef();

  // React.useEffect(() => {
  //   if (formRef.current.checkValidity()) {
  //     setIsValid(true);
  //     submitButtonRef.current.disabled = false;
  //   } else {
  //     setIsValid(false);
  //     submitButtonRef.current.disabled = true;
  //   }
  // }, [searchText]);

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultText = searchText.trim();
    if (resultText.length > 0) {
      onSearch(resultText, isFilterEnabled);
      setErrorMessage("");
    } else {
      setErrorMessage(message.validationMessage.emptySearchText);
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
          className="search-form__submit"
          type="submit"
          value="Найти"
        />
        <span className="search-form__error-message">{errorMessage}</span>
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
