import Api from "./Api";

class MainApi extends Api {
    constructor({ baseUrl, headers }) {
        super({ baseUrl, headers })
    }

    signup({ name, email, password }) {
        return super._request('/signup', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
        });
    }

    signin({ email, password }) {
        return super._request('/signin', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });
    }

    getUserInfo(token) {
        return super._request('/users/me', {
            method: 'GET',
            headers: {...this._headers,
                Authorization: `Bearer ${token}`
            },
        });
    }
}

const mainApi = new MainApi({
    //baseUrl: 'https://api.movies.jane.nomoredomainsmonster.ru',
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default mainApi;
