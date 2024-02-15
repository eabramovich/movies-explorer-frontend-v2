import React from "react";
import "./Movies.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Footer from "../Footer/Footer";
import { CurrentMoviesContext } from "../../contexts/CurrentMoviesContext";
import moviesApi from "../../utils/MoviesApi";
import MoviesList from "../../utils/MoviesList";

function Movies() {
  const { isLoggedIn } = React.useContext(CurrentUserContext);
  const { moviesSearchResult, setMoviesSearchResult } =
    React.useContext(CurrentMoviesContext);
  const [movies, setMovies] = React.useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(true);

  const [moviesSearchText, setMoviesSearchText] = React.useState(() => {
    const moviesSearchText = localStorage.getItem("moviesSearchText");
    return moviesSearchText ? moviesSearchText : "";
  });
  const [isMoviesFilterEnabled, setIsMoviesFilterEnabled] = React.useState(
    () => {
      const isMoviesFilterEnabled = JSON.parse(
        localStorage.getItem("isMoviesFilterEnabled")
      );
      return isMoviesFilterEnabled ? isMoviesFilterEnabled : false;
    }
  );
  const [moviesErrorMessage, setMoviesErrorMessage] = React.useState("");
  //const [emptySearchResultText, setEmptySearchResultText] = React.useState("");

  const moviesList = new MoviesList(movies);

  React.useEffect(() => {
    moviesApi
      .getFilms()
      .then((movies) => {
        const result = movies.map((movie) => {
          movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
          movie.image = `https://api.nomoreparties.co${movie.image.url}`;
          movie.movieId = movie.id;
          return movie;
        });
        setMovies(result);
        setIsMoviesLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMoviesErrorMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        setIsMoviesLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (!moviesSearchText) {
      setMoviesSearchText("");
      setMoviesSearchResult([]);
      setIsMoviesFilterEnabled(false);
      setMoviesErrorMessage("");
      localStorage.setItem("moviesSearchText", "");
      localStorage.setItem("moviesSearchResult", JSON.stringify([]));
    }
  }, [moviesSearchText, setMoviesSearchResult]);

  const onMoviesSearch = (resultText, isFilterEnabled) => {
    setIsMoviesLoading(true);
    moviesList.setInitialCards(movies);
    let result = moviesList.filterMoviesListByName(resultText, isFilterEnabled);
    setMoviesSearchResult(result);
    setIsMoviesLoading(false);
    localStorage.setItem("moviesSearchText", moviesSearchText);
    localStorage.setItem("moviesSearchResult", JSON.stringify(result));
  };

  const onFilterShortMovies = (e) => {
    setIsMoviesFilterEnabled(e.target.checked);
    localStorage.setItem(
      "isMoviesFilterEnabled",
      JSON.stringify(e.target.checked)
    );
    if (moviesSearchResult) {
      let result = moviesList.filterMoviesListByName(
        moviesSearchText,
        e.target.checked
      );
      setMoviesSearchResult(result);
      localStorage.setItem("moviesSearchResult", JSON.stringify(result));
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm
          onSearch={onMoviesSearch}
          searchText={moviesSearchText}
          setSearchText={setMoviesSearchText}
          isFilterEnabled={isMoviesFilterEnabled}
          setFilterEnabled={setIsMoviesFilterEnabled}
          handleCheckboxChange={onFilterShortMovies}
        />
        {isMoviesLoading ? (
          <Preloader />
        ) : moviesErrorMessage ? (
          <p className="movies__message">{moviesErrorMessage}</p>
        ) : moviesSearchResult.length > 0 ? (
          <>
            <MoviesCardList movies={moviesSearchResult}></MoviesCardList>
            <MoreButton />
          </>
        ) : (
          <p className="movies__message">Ничего не найдено</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
