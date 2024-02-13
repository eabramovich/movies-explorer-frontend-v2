class MoviesList {
  constructor(cards) {
    this._cards = cards;
  }

  setInitialCards(initialCards) {
    this._cards = initialCards;
  }
  
  filterMoviesListByName(name, isShort = false) {
    const normalizedSearch = name.toLowerCase();
    return this._cards.filter(
      (item) => {
        const isNameMatch = item.nameRU.toLowerCase().includes(normalizedSearch) ||
        item.nameEN.toLowerCase().includes(normalizedSearch);
        const isDurationValid = !isShort || item.duration <= 40;
        return isNameMatch && isDurationValid;
      }
    );
  }

  filterMoviesListByDuration(isShort) {
    return this._cards.filter(
      (item) => {
        const isDurationValid = !isShort || item.duration <= 40;
        return isDurationValid;
      }
    )
  }
}

export default MoviesList;
