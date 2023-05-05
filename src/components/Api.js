const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-21",
  headers: {
    authorization: "6fc36c5b-30c6-4228-accb-664772d22e4e",
    "Content-Type": "application/json",
  },
};

class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  editUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseData);
  }

  changeAvatar(newUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newUrl,
      }),
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }
  addCardInServer(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }

  deleteCardInServer(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setLike(idCard) {
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  deleteLike(idCard) {
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }
}

export const api = new Api(config);
