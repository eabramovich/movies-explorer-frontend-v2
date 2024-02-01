export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // _handleResponse(response) {
  //     if(response.ok) {
  //         return response.json();
  //     }

  //     console.log(response.text());

  //     return Promise.reject(`Что-то пошло не так: ${response.text()}`);
  // }

  _handleResponse(response) {
    console.log(response);
    //console.log(response.text());
    //console.log(response.json());
    if (!response.ok) {
      // Если статус ответа не в пределах 200-299, считаем это ошибкой
      return response.text().then((errorText) => {
        console.log(errorText);
        throw new Error(`${errorText}`);
      });
    }
    return response.json();
  }

  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options).then(this._handleResponse);
  }
}
