import React from "react";
import "./Movies.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Footer from "../Footer/Footer";

function Movies({ cards }) {
  const { isLoggedIn } = React.useContext(CurrentUserContext);
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm />
        {isMoviesLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList cards={cards}></MoviesCardList>
            <MoreButton />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
