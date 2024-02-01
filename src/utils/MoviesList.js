class MoviesList {
  constructor(cards) {
    this._cards = cards;
  }

  setInitialCards(initialCards) {
    this._cards = initialCards;
  }
  
  filterMoviesListByName(name) {
    console.log(this._cards);
    return this._cards.filter(
      (item) =>
        item.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(name.toLowerCase())
    );
  }
}

export default MoviesList;
