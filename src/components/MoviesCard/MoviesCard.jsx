import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CurrentMoviesContext } from "../../contexts/CurrentMoviesContext";
import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const location = useLocation();
  const { savedMovies, saveMovie, deleteMovie } = React.useContext(CurrentMoviesContext);
  const { image, nameRU, duration, trailerLink } = movie;
  const [ isSavedMovie, setIsSavedMovie ] = React.useState(savedMovies.some(savMmovie => savMmovie.movieId === movie.movieId));

  React.useEffect(() => {
    const isMovieSaved = savedMovies.some(savMmovie => savMmovie.movieId === movie.movieId);
    setIsSavedMovie(isMovieSaved);
  }, [isSavedMovie, savedMovies, setIsSavedMovie, movie]);

  const handleActionIconClick = () => {
    console.log(movie);
    console.log(isSavedMovie);
    if(isSavedMovie) {
      deleteMovie(movie)
      .then((res) => {
        setIsSavedMovie(!isSavedMovie)
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      saveMovie(movie)
      .then((res) => {
        setIsSavedMovie(!isSavedMovie);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const transformDuration = (duration) => {
    const hour = Math.floor(duration / 60);
    const minute = duration % 60;
    return hour > 0 ? `${hour}ч ${minute}м` : `${minute}м`;
  }

  return (
    <li className="movies-card">
      <div className="movies-card__image-wrapper">
        <Link to={trailerLink} target="_blank"><img className="movies-card__image" src={image} alt={nameRU} /></Link>
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
        <span className="movies-card__duration">{transformDuration(duration)}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
