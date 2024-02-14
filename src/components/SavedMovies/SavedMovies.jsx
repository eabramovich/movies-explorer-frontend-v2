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
  const { savedMovies, setSavedMovies } = React.useContext(CurrentMoviesContext);
  //const [savedMovies, setSavedMovies] = React.useState([]);
  const [isSavedMoviesLoading, setIsMoviesLoading] = React.useState(false);
  const [savedMoviesSearchResult, setSavedMoviesSearchResult] = React.useState(
    () => {
      const savedMoviesSearchResult = localStorage.getItem(
        "savedMoviesSearchResult"
      );
      return savedMoviesSearchResult
        ? JSON.parse(savedMoviesSearchResult)
        : savedMovies;
    }
  );
  const [savedMoviesSearchText, setSavedMoviesSearchText] = React.useState(
    () => {
      const savedMoviesSearchText = localStorage.getItem(
        "savedMoviesSearchText"
      );
      return savedMoviesSearchText ? savedMoviesSearchText : "";
    }
  );
  const [isSavedMoviesFilterEnabled, setIsSavedMoviesFilterEnabled] =
    React.useState(() => {
      const isSavedMoviesFilterEnabled = JSON.parse(
        localStorage.getItem("isSavedMoviesFilterEnabled")
      );
      return isSavedMoviesFilterEnabled ? isSavedMoviesFilterEnabled : false;
    });

  const savedMoviesList = new MoviesList(savedMoviesSearchResult);

  React.useEffect(() => {
    console.log("set saved cards");
    const token = localStorage.getItem("token");
    mainApi
      .getSavedMovies(token)
      .then((savedMovies) => {
        console.log(savedMovies);
        // setCards(movies);
        // moviesList.setInitialCards(movies);
        setSavedMovies(savedMovies.data);
        if(!savedMoviesSearchText) {
          setSavedMoviesSearchResult(savedMovies.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [savedMoviesSearchText, setSavedMovies]);

  const onSavedMoviesSearch = (resultText, isFilterEnabled) => {
    //savedMoviesList.setInitialCards(savedMovies);
    let result = savedMoviesList.filterMoviesListByName(
      resultText,
      isFilterEnabled
    );
    setSavedMoviesSearchResult(result);
    localStorage.setItem("savedMoviesSearchText", savedMoviesSearchText);
    localStorage.setItem("savedMoviesSearchResult", JSON.stringify(result));
  };

  const onFilterShortMovies = (e) => {
    setIsSavedMoviesFilterEnabled(e.target.checked);
    localStorage.setItem("isSavedMoviesFilterEnabled", JSON.stringify(e.target.checked));
    if(savedMoviesSearchResult) {
     
      //if(!savedMoviesSearchText) {
        savedMoviesList.setInitialCards(savedMovies);
        console.log(savedMoviesList);
      //}
      let result = savedMoviesList.filterMoviesListByName(savedMoviesSearchText, e.target.checked);
      setSavedMoviesSearchResult(result);
      localStorage.setItem("savedMoviesSearchResult", JSON.stringify(result));
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
        ) : (
          <>
            <MoviesCardList movies={savedMovies}></MoviesCardList>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
