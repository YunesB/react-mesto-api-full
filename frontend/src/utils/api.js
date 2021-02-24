class Api {
  constructor({ address }) {
    this._address = address;
    let jwt = localStorage.getItem('jwt');
    this._token = jwt;
  }

  handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`,
      {
        headers: {
          "Authorization": `Bearer ${this._token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) =>
        this.handleResponse(res)
      )
  };

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
      .then((res) =>
        this.handleResponse(res)
      )
  }

  deleteCard(card) {
    return fetch(`${this._address}/cards/${card}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) =>
        this.handleResponse(res)
      )
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`,
      {
        headers: {
          "Authorization": `Bearer ${this._token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) =>
        this.handleResponse(res)
      )
  }

  setUserInfo(data) {
    return fetch(`${this._address}/users/me`,
      {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) =>
        this.handleResponse(res)
      )
  }

  setUserAva(data) {
    return fetch(`${this._address}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) =>
        this.handleResponse(res)
      )
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return fetch(`${this._address}/cards/${card._id}/likes`,
        {
          method: 'PUT',
          headers: {
            "Authorization": `Bearer ${this._token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) =>
          this.handleResponse(res)
        )
    } else {
      return fetch(`${this._address}/cards/${card._id}/likes`,
        {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${this._token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) =>
          this.handleResponse(res)
        )
    }
  }
}

export const api = new Api({
  address: 'http://api.webmesto.students.nomoreparties.space'
});
