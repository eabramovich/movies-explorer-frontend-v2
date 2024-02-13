import React from "react";
import { useLocation } from "react-router-dom";
import { CurrentMoviesContext } from "../../contexts/CurrentMoviesContext";
import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const location = useLocation();
  const { image, nameRU, duration, isSaved } = movie;
  const { isSavedMovie, setIsSavedMovie } = React.useState(false)
  console.log(movie);
  // const imageUrl = `https://api.nomoreparties.co${image.url}`;
  // const thumbnailUrl = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;

  const { saveMovie } = React.useContext(CurrentMoviesContext);

  const handleActionIconClick = () => {
    // movie.image = imageUrl;
    // movie.movieId = movie.id;
    // movie.thumbnail = thumbnailUrl;
    console.log(movie);
    saveMovie(movie);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__image-wrapper">
        <img className="movies-card__image" src={image} alt={nameRU} />
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
              location.pathname === "/movies" && isSavedMovie
                ? "movies-card__button_type_saved"
                : ""
            } ${
              location.pathname === "/movies" && !isSavedMovie
                ? "movies-card__button_type_unsaved"
                : ""
            }`}
            type="button"
            aria-label="Сохранить"
            onClick={handleActionIconClick}
          ></button>
        </div>
        <span className="movies-card__duration">{duration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
