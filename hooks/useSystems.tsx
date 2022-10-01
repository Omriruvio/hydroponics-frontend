import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../config';
import { useAuth } from './useAuth';

export interface System {
  _id: string;
  name: string;
  owner: string;
  ownerName: string;
  ownerPhoneNumber: string;
  dateCreated: Date;
  dateModified: Date;
  messageHistory: string[];
  users: string[];
  __v: number;
  isPublic: boolean;
}

const useSystems = () => {
  const [data, setData] = useState<System[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
  const { phoneNumber, isLoggedIn } = useAuth();

  const setSelectSystem = useCallback((system: System | null) => {
    setSelectedSystem(system);
  }, []);

  const sendRenameRequest = useCallback(async (userToken: string, systemId: string, newName: string) => {
    return fetch(`${BASE_URL}/system/${systemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ systemName: newName }),
    }).then(async (res) => (res.ok ? res.json() : Promise.reject(await res.json())));
  }, []);

  const setSystemAccess = useCallback(async (userToken: string, systemId: string, isPublic: boolean) => {
    return fetch(`${BASE_URL}/system/set-access/${systemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ isPublic }),
    }).then(async (res) => (res.ok ? res.json() : Promise.reject(await res.json())));
  }, []);

  useEffect(() => {
    if (!phoneNumber || !isLoggedIn) return;
    const fetchSystems = async () => {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${BASE_URL}/get-user-systems?` + new URLSearchParams({ phoneNumber }), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      setData(response.systems);
    };

    isLoggedIn && phoneNumber && fetchSystems();
  }, [phoneNumber, isLoggedIn]);

  return { data, setData, selectedSystem, setSelectSystem, sendRenameRequest, setSystemAccess };
};

export default useSystems;
