import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import MoviesList from "../../utils/MoviesList";
import mainApi from "../../utils/MainApi";
import { CurrentMoviesContext } from "../../contexts/CurrentMoviesContext";

function SavedMovies({ cards }) {
  const { isLoggedIn } = React.useContext(CurrentUserContext);
  const { savedMovies, setSavedMovies } =
    React.useContext(CurrentMoviesContext);
  const [isSavedMoviesLoading, setIsMoviesLoading] = React.useState(true);
  const [savedMoviesSearchResult, setSavedMoviesSearchResult] = React.useState(
    []
  );
  const [savedMoviesSearchText, setSavedMoviesSearchText] = React.useState("");
  const [isSavedMoviesFilterEnabled, setIsSavedMoviesFilterEnabled] =
    React.useState(false);

  const savedMoviesList = new MoviesList(savedMoviesSearchResult);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    mainApi
      .getSavedMovies(token)
      .then((savedMovies) => {
        setSavedMovies(savedMovies.data);
        setSavedMoviesSearchResult(savedMovies.data);
        setIsSavedMoviesFilterEnabled(false);
        setIsMoviesLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setSavedMovies]);

  React.useEffect(() => {
    if (savedMoviesSearchText.length === 0) {
      setSavedMoviesSearchResult(savedMovies);
    }
  }, [savedMoviesSearchText, savedMovies]);

  const onSavedMoviesSearch = (resultText, isFilterEnabled) => {
    savedMoviesList.setInitialCards(savedMovies);
    console.log(savedMovies);
    let result = savedMoviesList.filterMoviesListByName(
      resultText,
      isFilterEnabled
    );
    setSavedMoviesSearchResult(result);
  };

  const onFilterShortMovies = (e) => {
    setIsSavedMoviesFilterEnabled(e.target.checked);
    savedMoviesList.setInitialCards(savedMovies);
    if (!savedMoviesSearchText) {
      setSavedMoviesSearchResult(
        savedMoviesList.filterMoviesListByDuration(e.target.checked)
      );
    } else {
      setSavedMoviesSearchResult(
        savedMoviesList.filterMoviesListByName(
          savedMoviesSearchText,
          e.target.checked
        )
      );
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm
          onSearch={onSavedMoviesSearch}
          searchText={savedMoviesSearchText}
          setSearchText={setSavedMoviesSearchText}
          isFilterEnabled={isSavedMoviesFilterEnabled}
          setFilterEnabled={setIsSavedMoviesFilterEnabled}
          handleCheckboxChange={onFilterShortMovies}
        />
        {isSavedMoviesLoading ? (
          <Preloader />
        ) : savedMoviesSearchResult.length > 0 ? (
          <>
            <MoviesCardList movies={savedMoviesSearchResult}></MoviesCardList>
          </>
        ) : savedMovies.length > 0 ? (
          <p className="movies__message">Ничего не найдено</p>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
