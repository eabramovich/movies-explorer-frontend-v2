import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onActionIconClick}) {
  // const [moviesToRender, setMoviesToRender] = React.useState([]);

  

  // // Функция для определения количества карточек в зависимости от ширины экрана
  // function getCardCount() {
  //   const screenWidth = window.innerWidth;

  //   if (screenWidth >= 1280) {
  //        return 16;
  //       } else if (screenWidth >= 930) {
  //         return 12;
  //       } else if (screenWidth >= 630){
  //         return 8;
  //       } else {
  //         return 5;
  //       }
  // }

  return (
    <section className="movies-card-list section">
      {(movies !== null) ? (
        <ul className="movies-card-list__container">
          {movies.map((movie, i) => (
            <MoviesCard movie={movie} key={movie.movieId} onActionIconClick={onActionIconClick} />
          ))}
        </ul>
      ) : (
        <p>text</p>
      )}
    </section>
  );
}

export default MoviesCardList;
