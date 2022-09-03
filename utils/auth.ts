import { BASE_URL } from '../config';

export interface IUserAuth {
  email: string;
  phoneNumber?: string | null;
  password?: string;
}

const handleResponse = (res: Response): Promise<unknown> => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const register = ({ email, phoneNumber }: IUserAuth): Promise<unknown> => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, email }),
  }).then(handleResponse);
};

const login = ({ email, phoneNumber }: IUserAuth): Promise<unknown> => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, email }),
  }).then(handleResponse);
};

const adminLogin = ({ email, password }: IUserAuth): Promise<unknown> => {
  return fetch(`${BASE_URL}/super/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

const getAdminDetails = (token: string) => {
  return fetch(`${BASE_URL}/super/verify`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ` + token,
    },
    method: 'GET',
  }).then(handleResponse);
};

// const validateToken = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(handleResponse);
// };

export { login, register, handleResponse, adminLogin, getAdminDetails };
