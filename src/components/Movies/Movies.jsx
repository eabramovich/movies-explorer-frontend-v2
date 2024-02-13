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
  //const { moviesList } = React.useContext(CurrentMoviesContext);
  const [ movies, setMovies ] = React.useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);

  const [moviesSearchResult, setMoviesSearchResult] = React.useState(() => {
    const moviesSearchResult = localStorage.getItem("moviesSearchResult");
    return moviesSearchResult ? JSON.parse(moviesSearchResult) : [];
  });
  const [moviesSearchText, setMoviesSearchText] = React.useState(() => {
    const moviesSearchText = localStorage.getItem("moviesSearchText");
    return moviesSearchText ? moviesSearchText : '';
  });
  const [isMoviesFilterEnabled, setIsMoviesFilterEnabled] = React.useState(() => {
    const isMoviesFilterEnabled = JSON.parse(localStorage.getItem("isMoviesFilterEnabled"));
    return isMoviesFilterEnabled ? isMoviesFilterEnabled : false;
  });

  const moviesList = new MoviesList(movies);

  React.useEffect(() => {
    console.log("set movies");
      moviesApi.getFilms()
      .then((movies) => {
        //console.log(res);
        const result = movies.map(movie => {
          movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
          movie.image = `https://api.nomoreparties.co${movie.image.url}`;
          movie.movieId = movie.id;
          return movie;
        })
        console.log(result);
        setMovies(result);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, []);

  const onMoviesSearch = (resultText, isFilterEnabled) => {
    moviesList.setInitialCards(movies);
    let result = moviesList.filterMoviesListByName(resultText, isFilterEnabled);
    setMoviesSearchResult(result);
    localStorage.setItem("moviesSearchText", moviesSearchText);
    localStorage.setItem("moviesSearchResult", JSON.stringify(result));
  };

  const onFilterShortMovies = (e) => {
    setIsMoviesFilterEnabled(e.target.checked);
    localStorage.setItem("isMoviesFilterEnabled", JSON.stringify(e.target.checked));
    if(moviesSearchResult) {
      let result = moviesList.filterMoviesListByName(moviesSearchText, e.target.checked);
      setMoviesSearchResult(result);
      localStorage.setItem("moviesSearchResult", JSON.stringify(result));
    }
  }

  const handleToggleSaveCard = (card) => {

  }

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
        ) : (
          <>
            <MoviesCardList movies={moviesSearchResult}></MoviesCardList>
            <MoreButton />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
