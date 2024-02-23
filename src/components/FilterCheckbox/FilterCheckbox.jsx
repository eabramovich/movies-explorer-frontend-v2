import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isFilterEnabled, setIsFilterEnabled, onFilterCheckboxChange}) {
  // const onChecked = () => {
  //   setIsFilterEnabled(!isFilterEnabled);
  // }

  return (
    <div className="movies-filter">
      <label className="movies-filter__switch">
        <input
          type="checkbox"
          className="movies-filter__checkbox"
          checked={isFilterEnabled}
          onChange={onFilterCheckboxChange}
        />
        <span className="movies-filter__slider"></span>
      </label>
      <span className="movies-filter__label">Короткометражки:</span>
    </div>
  );
}

export default FilterCheckbox;
