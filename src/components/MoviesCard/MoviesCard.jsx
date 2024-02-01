import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ card }) {
  const location = useLocation();
  const { image, nameRU, duration, isSaved } = card;
  //console.log(card);
  const imageUrl = image.url;
  return (
    <li className="movies-card">
      <div className="movies-card__image-wrapper">
        <img className="movies-card__image" src={`https://api.nomoreparties.co${imageUrl}`} alt={nameRU} />
      </div>

      <div className="movies-card__info">
        <div className="movies-card__field-container">
          <h2 className="movies-card__name">{nameRU}</h2>
          <button
            className={`movies-card__button ${
              location.pathname === "/saved-movies"
                ? "movies-card__button_type_delete"
                : ""
            } ${
              location.pathname === "/movies" && isSaved
                ? "movies-card__button_type_saved"
                : ""
            } ${
              location.pathname === "/movies" && !isSaved
                ? "movies-card__button_type_unsaved"
                : ""
            }`}
            type="button"
            aria-label="Сохранить"
          ></button>
        </div>
        <span className="movies-card__duration">{duration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
