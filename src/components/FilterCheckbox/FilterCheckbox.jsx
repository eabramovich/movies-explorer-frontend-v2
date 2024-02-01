import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isChecked, setIsChecked }) {

  const onChecked = () => {
    console.log(isChecked);
    setIsChecked(!isChecked);
    console.log(isChecked);
  }

  return (
  <div className="movies-filter"> 
    <label className="movies-filter__switch">
        <input type="checkbox" className="movies-filter__checkbox" onClick={onChecked} />
        <span className="movies-filter__slider"></span>
    </label>
    <span className="movies-filter__label">Короткометражки:</span>
</div>
  );
}

export default FilterCheckbox;
