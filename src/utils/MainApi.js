import Api from "./Api";

class MainApi extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  signup({ name, email, password }) {
    return super._request("/signup", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }

  signin({ email, password }) {
    return super._request("/signin", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  getUserInfo(token) {
    return super._request("/users/me", {
      method: "GET",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  updateUserInfo({ name, email }, token) {
    return super._request("/users/me", {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        email
      }),
    });
  }

  addNewMovie({
    nameRU,
    nameEN,
    description,
    director,
    country,
    year,
    duration,
    thumbnail,
    trailerLink,
    image,
    movieId,
  }, token) {
    return super._request("/movies", {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        nameRU,
        nameEN,
        description,
        director,
        country,
        year,
        duration,
        thumbnail,
        trailerLink,
        image,
        movieId,
      }),
    });
  }

  removeMovie(movieId, token) {
    return super._request("/movies/" + movieId, {
      method: "DELETE",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  getSavedMovies(token) {
    return super._request("/movies", {
        method: "GET",
        headers: {...this._headers, Authorization: `Bearer ${token}` },
    });
  }

}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies.jane.nomoredomainsmonster.ru',
  //baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
