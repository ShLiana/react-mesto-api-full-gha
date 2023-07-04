export const BASE_URL = 'https://api.shmeleva.nomoreparties.sbs';
//export const BASE_URL = 'https://auth.nomoreparties.co';
//export const BASE_URL = 'http://104.131.160.75:3000';
//export const BASE_URL = 'http://localhost^3000';

//проверка ответа сервера
const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } 
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка код: ${res.status}`);
  }

export const registerUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkResponse(res));
};

export const loginUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkResponse(res));
};

//делаем запрос токена
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
    })
    .then((res) => checkResponse(res));
  };