import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
    return (
        <section className="movies-card-list section">
            <ul className="movies-card-list__container">
                {cards.map(( card,i ) => (
                    <MoviesCard card={card} key={card.id} />
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;
