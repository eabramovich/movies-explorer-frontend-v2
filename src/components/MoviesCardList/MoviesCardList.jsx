import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onActionIconClick}) {
  let [cardCount, setCardCount] = React.useState(0);
  let [moviesToRender, setMoviesToRender] = React.useState([]);

  React.useEffect(() => {
    const handleResize = () => {
      // Обновляем количество карточек в зависимости от ширины экрана
      console.log(window.innerWidth);
      if (window.innerWidth >= 1280) {
        setCardCount(16);
      } else if (window.innerWidth >= 930) {
        setCardCount(12);
      } else if (window.innerWidth >= 630){
        setCardCount(8);
      } else {
        setCardCount(5);
      }
      console.log("Card Count", cardCount);
      if(movies.length >= cardCount) {
        setMoviesToRender(movies.slice(0, cardCount));
        console.log(moviesToRender);
      }
    };

    // Добавляем слушатель события изменения размера экрана
    window.addEventListener('resize', handleResize);

    // Вызываем handleResize для установки начального значения при загрузке страницы
    handleResize();

    // Убираем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="movies-card-list section">
      {(movies !== null) ? (
        <ul className="movies-card-list__container">
          {moviesToRender.map((movie, i) => (
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
