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

function Movies({ cards, onSearch }) {
  const { isLoggedIn } = React.useContext(CurrentUserContext);
  const { moviesSearchResult, moviesSearchText, setMoviesSearchText } = React.useContext(CurrentMoviesContext);
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);
  console.log(isLoggedIn);
  console.log(moviesSearchResult);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm onSearch={onSearch} searchText={moviesSearchText} setSearchText={setMoviesSearchText} />
        {isMoviesLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList cards={moviesSearchResult}></MoviesCardList>
            <MoreButton />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
