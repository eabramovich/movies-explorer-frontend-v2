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
    if (!savedMoviesSearchText) {
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
    }
  }, [setSavedMovies, savedMoviesSearchText]);

  const onSavedMoviesSearch = (resultText, isFilterEnabled) => {
    let result = savedMoviesList.filterMoviesListByName(
      resultText,
      isFilterEnabled
    );
    setSavedMoviesSearchResult(result);
  };

  React.useEffect(() => {
    savedMoviesList.setInitialCards(savedMovies);
    if (!savedMoviesSearchText) {
      let result = savedMoviesList.filterMoviesListByDuration(
        isSavedMoviesFilterEnabled
      );
      setSavedMoviesSearchResult(result);
    } else {
      let result = savedMoviesList.filterMoviesListByName(
        savedMoviesSearchText,
        isSavedMoviesFilterEnabled
      );
      setSavedMoviesSearchResult(result);
    }
  }, [savedMovies, isSavedMoviesFilterEnabled]);

  const onFilterShortMovies = (e) => {
    setIsSavedMoviesFilterEnabled(e.target.checked);
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
        ) : (
          <>
            <MoviesCardList movies={savedMoviesSearchResult}></MoviesCardList>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
