import Api from "./Api";

class MoviesApi extends Api {
    constructor({ baseUrl, headers }) {
        super({ baseUrl, headers })
    }

    getFilms() {
        return super._request('/', {
            method: 'GET',
            headers: this._headers,
        });
    }

}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;