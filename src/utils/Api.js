export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(response) {
    if (!response.ok) {
      return response.text().then((errorText) => {
        throw new Error(`${errorText}`);
      });
    }
    return response.json();
  }

  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options).then(this._handleResponse);
  }
}
