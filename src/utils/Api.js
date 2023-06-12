export default class Api {
  constructor(config) {
    this.url = config.url
    this.headers = config.headers
  }

  _getJSONResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  getInitialCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers,
      method: "GET"
    }).then(res => {
      return this._getJSONResponse(res)
    })
  }
  createNewCard(item) {
    return fetch(`${this.url}cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(item)
    }).then(res => {
      return this._getJSONResponse(res)
    })

  }

  getUserInfo() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers,
      method: "GET"
    }).then(res => {
      return this._getJSONResponse(res)
    })
  }
  setUserInfo(userData) {
    return fetch(`${this.url}users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify(userData)
    }).then(res => {
      return this._getJSONResponse(res)
    })
  }
  changeUserAvatarImage(avatar) {
    return fetch(`${this.url}users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify(avatar)
    }).then(res => {
      return this._getJSONResponse(res)
    })
  }
  deleteCard(cardId) {
    return fetch(`${this.url}cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE"
    }).then(res => {
      return this._getJSONResponse(res)
    })
  }
  putLikeCard(cardId) {
    return fetch(`${this.url}cards/${cardId}/likes`, {
      headers: this.headers,
      method: "PUT"
    }).then(res => {
      return this._getJSONResponse(res)
    })
  }
  deleteLikeCard(cardId) {
    return fetch(`${this.url}cards/${cardId}/likes`, {
      headers: this.headers,
      method: "DELETE"
    }).then(res => {
      return this._getJSONResponse(res)
    })
  }
}
