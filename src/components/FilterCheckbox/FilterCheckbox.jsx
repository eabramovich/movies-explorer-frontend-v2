import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
  <div className="movies-filter"> 
    <label className="movies-filter__switch">
        <input type="checkbox" className="movies-filter__checkbox"/>
        <span className="movies-filter__slider"></span>
    </label>
    <span className="movies-filter__label">Короткометражки:</span>
</div>
  );
}

export default FilterCheckbox;
