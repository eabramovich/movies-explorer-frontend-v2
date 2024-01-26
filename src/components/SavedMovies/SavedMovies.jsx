import React from "react";
import "./SavedMovies.css";
// import SearchForm from "../SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Movies from "../Movies/Movies";

function SavedMovies({ cards }) {
    return (
        <Movies cards={cards} />
    );
}

export default SavedMovies;