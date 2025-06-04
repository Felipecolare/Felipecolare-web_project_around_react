class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  _request(url, options) {
    console.log('Fazendo requisição para:', url);
    return fetch(url, options).then(this._checkResponse);
  }

  // Método para obter informações do usuário
  getUserInfo() {
    console.log('Buscando informações do usuário...');
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // Método para atualizar informações do usuário
  setUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  // Método para obter todos os cartões
  getInitialCards() {
    console.log('Buscando cartões...');
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  // Método para adicionar um novo cartão
  addCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  // Método para deletar um cartão
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Método para curtir um cartão
  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // Método para descurtir um cartão
  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Método para alterar curtida (like/dislike)
  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }

  // Método para atualizar avatar do usuário
  setUserAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}

// Criando uma instância da API com os parâmetros necessários
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQyMWZjODcxZWNiMzAwMWVmOTQ1MjciLCJpYXQiOjE3MzI0MDI0NTZ9.QPlus1HCvJGqhYGlqQJdRCM-LqJn6I1OJ2fKN1t-DqE",
    "Content-Type": "application/json",
  },
});

// Teste imediato da API
console.log('Testando conexão da API...');
api.getUserInfo()
  .then(userData => {
    console.log('✅ API funcionando! Dados do usuário:', userData);
  })
  .catch(err => {
    console.error('❌ Erro na API:', err);
  });

export default api;