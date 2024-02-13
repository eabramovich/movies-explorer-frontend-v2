import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onActionIconClick}) {
  console.log(movies);
  return (
    <section className="movies-card-list section">
      {(movies !== null) ? (
        <ul className="movies-card-list__container">
          {movies.map((movie, i) => (
            <MoviesCard movie={movie} key={movie.id} onActionIconClick={onActionIconClick} />
          ))}
        </ul>
      ) : (
        <p>text</p>
      )}
    </section>
  );
}

export default MoviesCardList;
