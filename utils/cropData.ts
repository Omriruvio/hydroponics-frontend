import { MessageUpdateInputs } from '../components/CardEditPopup';
import { BASE_URL } from '../config';
import { handleResponse, IUserAuth } from './auth';

/**
 * @param days number representing amount of days in history to be fetched
 * @param user IUserAuth object containing user authentication data
 * @param systemId mongoos ObjectId of the system to be fetched
 * @returns Promisified array containing crop data results
 */

export const getCropData = (days: number, user: IUserAuth, systemId: string | undefined) => {
  return fetch(`${BASE_URL}/history/${user.phoneNumber}/${days}/${systemId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  }).then(handleResponse);
};

export const getGrowers = (token: string) => {
  return fetch(`${BASE_URL}/super/growers`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ` + token,
    },
    method: 'GET',
  }).then(handleResponse);
};

export const getUserMessages = (token: string) => {
  return fetch(`${BASE_URL}/messages`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ` + token,
    },
    method: 'GET',
  }).then(handleResponse);
};

export const sendUpdatedMessage = (token: string, message: MessageUpdateInputs) => {
  return fetch(`${BASE_URL}/update-message`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ` + token,
    },
    method: 'PUT',
    body: JSON.stringify(message),
  }).then(handleResponse);
};

export const sendDeleteMessage = (token: string, messageId: string) => {
  return fetch(`${BASE_URL}/delete-message`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ` + token,
    },
    method: 'DELETE',
    body: JSON.stringify({ messageId }),
  }).then(handleResponse);
};
