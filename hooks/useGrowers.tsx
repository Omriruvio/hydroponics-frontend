import { useEffect, useState, useCallback } from 'react';
import { BASE_URL } from '../config';
import { getGrowers } from '../utils/cropData';
import { useAuth } from './useAuth';

export interface Grower {
  _id: string;
  phoneNumber: string;
  email: string;
  messageOptIn: boolean;
  __v: number;
  receiveReminders: boolean;
  lastReceivedPush: Date;
  username: string;
  defaultSystem?: string;
}

export interface SupervisorGrowersData {
  _id: string;
  users: Grower[];
}

const useGrowers = () => {
  const [growers, setGrowers] = useState<Grower[]>([]);
  const currentUser = useAuth();

  const getDefaultSystem = useCallback(async (phoneNumber: string) => {
    // fetch from BASE_URL/get-default-system?phoneNumber=${phoneNumber}
    const token = localStorage.getItem('jwt');
    const defaultSystem = await fetch(`${BASE_URL}/get-default-system?` + new URLSearchParams({ phoneNumber }), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return defaultSystem;
  }, []);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      const adminToken = localStorage.getItem('adminJWT');
      adminToken &&
        getGrowers(adminToken)
          .then((data) => {
            const growerData = data as SupervisorGrowersData;
            const growers = growerData?.users;
            if (Array.isArray(growers)) {
              setGrowers(growers);
            }
          })
          .catch((err) => console.log(err));
    }
  }, [currentUser]);

  return { growers, getDefaultSystem };
};

export default useGrowers;
