import { BASE_URL } from '../config';
import { handleResponse, IUserAuth } from './auth';

/**
 * @param days number representing amount of days in history to be fetched
 * @returns Promisified array containing crop data results
 */

export const getCropData = (days: number, user: IUserAuth) => {
  return fetch(`${BASE_URL}/history/${user.phoneNumber}/${days}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  }).then(handleResponse);
};

export const getGrowers = (superEmail: string) => {
  return fetch(`${BASE_URL}/super/growers/${superEmail}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  }).then(handleResponse);
};
