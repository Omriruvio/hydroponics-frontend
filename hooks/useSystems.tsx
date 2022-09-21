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

  const setSelectSystem = useCallback((system: System) => {
    setSelectedSystem(system);
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

  return { data, selectedSystem, setSelectSystem };
};

export default useSystems;
